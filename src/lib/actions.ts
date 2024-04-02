"use server";
import prisma from "@/lib/prisma";
import { MoodType, Prisma, Mood } from "@prisma/client";

export async function getUserByTelegramId(telegramId: number) {
  let user = await prisma.user.findFirst({
    where: {
      telegramId: telegramId,
    },
    include: {
      moods: true,
      tasks: true,
      userMessages: true,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        telegramId: telegramId,
      },
      include: {
        moods: true,
        tasks: true,
        userMessages: true,
      },
    });
  }

  return user;
}

export async function addMoodToUser(
  mood: MoodType,
  userId: string,
  note?: string
): Promise<Mood> {
  const newMood = await prisma.mood.create({
    data: {
      mood: mood,
      note: note,
      userId: userId,
    },
  });

  return newMood;
}

export async function getUserById(id: string) {
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
    include: {
      moods: true,
      tasks: true,
      userMessages: true,
    },
  });

  return user;
}
