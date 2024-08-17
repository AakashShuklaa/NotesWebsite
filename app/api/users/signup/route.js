import { connect } from '@/lib/db'
import User from '@/lib/userModel'
import {NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

await connect()

export async function POST(req) {
    try {
        const reqBody = await req.json()
        const { email, password1 } = reqBody
        console.log(reqBody)

        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ message: "User already exists" }, { status: 500 })
        }

        const salt = bcryptjs.genSaltSync(10)
        const hashedPassword = await bcryptjs.hash(password1, salt)

        const newUser = new User({
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        return NextResponse.json({ message: "User created successfully", user: savedUser }, { status: 201 })
        
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}
