import db from "@/clients";
import { NextRequest, NextResponse } from "next/server";
import { hashpassword } from "@/utils/hash_password";




export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { firstName, email, password, role, subordinate } = await req.json();
    console.log(firstName, email, password, role, subordinate);
    const encypt = hashpassword(password);

    // if (!roleHierarchy[role]) {
    //   return NextResponse.json(
    //     { message: "Invalid role" },
    //     { status: 400 }
    //   );
    // }

    // const validSubordinateRole = roleHierarchy[role];
    // if (validSubordinateRole && subordinate.length > 0) {
    //   const invalidSubordinate = subordinate.some(
    //     (sub:any) => sub.role !== validSubordinateRole
    //   );

    //   if (invalidSubordinate) {
    //     return NextResponse.json(
    //       { message: `Subordinate must be a ${validSubordinateRole}` },
    //       { status: 400 }
    //     );
    //   }
    // } else if (!validSubordinateRole && subordinate.length > 0) {
    //   return NextResponse.json(
    //     { message: "JUNIOR cannot have subordinates" },
    //     { status: 400 }
    //   );
    // }

    let newUserData: any = {
      email,
      password:encypt,
      name:firstName,
      role,
      level:role=="MANAGER"?1:role=="SUPERVISOR"?2:role=="PARTICIPANT"?3:role=="PEER"?4:role=="JUNIOR"?5:0
    };
    
    // if (role === "MANAGER") {
    //   newUserData.manager = {
    //     create: subordinate.map((sub: any) => ({ id: sub.id })),
    //   };
    // } else if (role === "SUPERVISOR") {
    //   newUserData.supervisor = {
    //     connect: subordinate.map((sub: any) => ({ id: sub.id })),
    //   };
    // } else if (role === "PEER") {
    //   newUserData.peer = {
    //     connect: subordinate.map((sub: any) => ({ id: sub.id })),
    //   };
    // } else if (role === "JUNIOR") {
    //   newUserData.junior = null;
    // }

    const createdUser = await db.user.create({
      data: newUserData,
      
    });
    console.log(createdUser)

    return NextResponse.json(
      { message: "User added successfully", user: createdUser },
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
