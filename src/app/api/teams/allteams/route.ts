import db from "@/clients";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    
   const allUser = await db.user.findMany({
    where:{
        NOT:{
            role:'ADMIN'
        }
    },
    orderBy:{
      level:'asc'
    }
   });
    return NextResponse.json(
      { message: "Users Found successfully", user: allUser },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error adding user", error: (error as Error).message },
      { status: 500 }
    );
  }
};
