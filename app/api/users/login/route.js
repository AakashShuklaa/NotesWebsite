import { connect } from '@/lib/db'
import User from '@/lib/userModel'
import {NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import * as jose from 'jose';

await connect()

export async function POST(req) {
    try {
        const reqBody = await req.json()
        const { email, password } = reqBody
        console.log(reqBody)
        const user = await User.findOne({email})
        if(!user) {
            return NextResponse.json({error: "user does not exist"},{status: 400})
        }
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword) {
            return NextResponse.json({error: "Invalid Password"},{status: 400})
        }
        const tokenData = {
            id: user._id,
            email: user.email
        }
        const secret = new TextEncoder().encode(
            process.env.TOKEN_SECRET,
          )
          const signedToken = await new jose.SignJWT(tokenData)
          .setProtectedHeader({ alg: 'HS256' })
          .setExpirationTime('5s')
          .sign(secret);

        const response = NextResponse.json({
            message: "Login successful",
            success: true
        })

        response.cookies.set("token", signedToken, {
            httpOnly: true,
        })
        return response;
        
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}
