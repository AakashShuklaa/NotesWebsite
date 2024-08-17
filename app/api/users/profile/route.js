import { connect } from '@/lib/db'
import User from '@/lib/userModel'
import {NextResponse } from 'next/server'

await connect()

export async function POST(req) {
    try {
        // const reqBody = await req.json()
        // const { email } = reqBody
        // console.log(reqBody)
        // const user = await User.findOne({email})
        
        // return response;
        
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}