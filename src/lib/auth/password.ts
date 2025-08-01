import bcrypt from "bcryptjs";

export class PasswordService {
  private static readonly SALT_ROUNDS = 12;

  /**
   * Hash a plain text password
   */
  static async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw new Error("Failed to hash password", { cause: error as Error });
    }
  }

  /**
   * Verify a password against a hash
   */
  static async verifyPassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      console.log("Password verification failed:", error);
      return false;
    }
  }

  /**
   * Validate password strength
   */
  static validatePassword(password: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push("Mật khẩu phải có ít nhất 8 ký tự");
    }

    if (password.length > 128) {
      errors.push("Mật khẩu không được quá 128 ký tự");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("Mật khẩu phải có ít nhất 1 chữ thường");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Mật khẩu phải có ít nhất 1 chữ hoa");
    }

    if (!/\d/.test(password)) {
      errors.push("Mật khẩu phải có ít nhất 1 số");
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push("Mật khẩu phải có ít nhất 1 ký tự đặc biệt");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
