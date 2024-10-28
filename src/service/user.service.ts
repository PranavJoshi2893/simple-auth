import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UserLoginDTO, UserRegisterDTO } from "../dto/user/user.dto";
import prisma from "../model/prisma.config";
import { BadRequestError, ConflictError, ForbiddenError, NotFoundError } from "../utils/error.handler";
import { compare, hash } from "bcrypt";

/**
 * User Registration Module
 *
 * This module provides functionality for user registration, including:
 * 1. Password extraction and validation
 * 2. Hashing the password using bcrypt
 * 3. Checking email uniqueness in the database
 * 4. Storing user credentials securely
 *
 * @module UserRegistration
 * @requires bcrypt
 * @requires Database
 */

async function registerUser(userDetails: UserRegisterDTO) {
  try {
    const { firstName, lastName, email, password } = userDetails;
    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    return { message: "New User Created" };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") throw new ConflictError("Email Credential's already taken");
    }
    throw new BadRequestError("Something bad happened during user registration");
  }
}

async function loginUser(userDetails: UserLoginDTO) {
  const { email, password } = userDetails;

  const user = await prisma.user.findUnique({
    where: { email },
    select: { password: true },
  });

  if (!user) throw new NotFoundError("Invalid Credentials");

  const isMatch = await compare(password, user.password);

  if (!isMatch) throw new ForbiddenError("Invalid Password");

  return { message: "Login Successful!" };
}

export { registerUser, loginUser };
