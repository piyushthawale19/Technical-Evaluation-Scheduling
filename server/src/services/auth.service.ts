import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import type { AuthTokensDto, LoginDto, RegisterDto } from "../dto/auth.dto.js";
import { AppError } from "../middlewares/error.middleware.js";
import { OrganizationRepository } from "../repositories/organization.repository.js";
import { UserRepository } from "../repositories/user.repository.js";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
}

export class AuthService {
  constructor(
    private readonly organizationRepository = new OrganizationRepository(),
    private readonly userRepository = new UserRepository(),
  ) {}

  async register(dto: RegisterDto) {
    const slugBase = slugify(dto.organizationName);
    const uniqueSuffix = crypto.randomBytes(3).toString("hex");
    const organization = await this.organizationRepository.create({
      name: dto.organizationName,
      slug: `${slugBase}-${uniqueSuffix}`,
      timezone: "UTC",
      isActive: true,
    });

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.userRepository.create({
      organizationId: organization._id,
      fullName: dto.fullName,
      email: dto.email.toLowerCase(),
      passwordHash,
      roles: ["admin"],
      isActive: true,
    });

    return {
      organization,
      user,
      tokens: this.createTokens(
        String(user._id),
        String(organization._id),
        user.roles,
      ),
    };
  }

  async login(
    dto: LoginDto,
    organizationHint?: string,
  ): Promise<{ user: unknown; organization: unknown; tokens: AuthTokensDto }> {
    const user = organizationHint
      ? await this.userRepository.findByEmailAndOrganization(
          dto.email.toLowerCase(),
          organizationHint,
        )
      : await this.userRepository.findOne({ email: dto.email.toLowerCase() });

    if (!user) {
      throw new AppError("Invalid credentials", 401, "INVALID_CREDENTIALS");
    }

    const isValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isValid) {
      throw new AppError("Invalid credentials", 401, "INVALID_CREDENTIALS");
    }

    const organization = await this.organizationRepository.findById(
      String(user.organizationId),
    );
    if (!organization) {
      throw new AppError(
        "Organization not found",
        404,
        "ORGANIZATION_NOT_FOUND",
      );
    }

    return {
      user,
      organization,
      tokens: this.createTokens(
        String(user._id),
        String(user.organizationId),
        user.roles,
      ),
    };
  }

  refreshTokens(
    userId: string,
    organizationId: string,
    roles: string[],
  ): AuthTokensDto {
    return this.createTokens(userId, organizationId, roles);
  }

  private createTokens(
    userId: string,
    organizationId: string,
    roles: string[],
  ): AuthTokensDto {
    const payload = { userId, organizationId, roles };
    return {
      accessToken: jwt.sign(payload, env.jwtAccessSecret, {
        expiresIn: env.accessTokenExpiry as any,
      }),
      refreshToken: jwt.sign(payload, env.jwtRefreshSecret, {
        expiresIn: env.refreshTokenExpiry as any,
      }),
    };
  }
}
