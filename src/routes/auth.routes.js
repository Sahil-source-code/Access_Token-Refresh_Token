import {Router} from 'express';
const router=Router();
import bcrypt from 'bcryptjs'
import userModel from "../models/user.models.js"
import {generateTokens, verifyAccessToken, verifyRefreshToken} from "../utils/auth.js"

router.post('/register',async (req,res)=>{


 
    const {name,email,password}=req.body;
    const isUserExist=await userModel.findOne({email})
    if(isUserExist){
        return res.status(400).json({
            message:"User already exist",
            errors:[
                {
                    field:"email",
                    message:"User already exist"
                }
            ]
        })
    }
    const user =  await userModel.create({
        name,
        email,
        passwordHash:await bcrypt.hash(password,12),
    })
    const {accessToken,refreshToken}=generateTokens({userId:user._id})
    user.refreshToken=refreshToken;
    await user.save();
    res.cookie("refreshToken",refreshToken,{ 
        httpOnly: true,
    })
    res.status(201).json({
        message:"User created successfully",
        data:{
            user:{
                name:user.name,
                email:user.email,
            },
            accessToken
        }
    })


})

/**
 * @GET /api/get/me
 */
router.get("/me", async (req, res) => {

    const accessToken = req.headers.authorization?.split(" ")[ 1 ]

    if (!accessToken) {
        return res.status(401).json({
            message: "Unauthorized, access token not found",
        })
    }

    try {

        const decoded = verifyAccessToken(accessToken)

        const user = await userModel.findById(decoded.id)

        res.status(200).json({
            message: "user fetched successfully",
            data: {
                user: {
                    name: user.name,
                    email: user.email
                }
            }
        })

    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized, Invalid or expired access token",
        })
    }


})

/**
 * @POST /api/auth/refresh
 */
router.post("/refresh", async (req, res) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        return res.status(401).json({
            message: "Unauthorized, refresh token not found",
        })
    }
    try{
        const decoded= await verifyRefreshToken(refreshToken)
        const user=await userModel.findById(decoded.userId)
        if(refreshToken!==user.refreshToken){
            user.refreshToken=null;
            await user.save();
            return res.status(401).json({
                message: "Unauthorized, Invalid refresh token",
            })
        }
        const {accessToken,refreshToken:newRefreshToken}=generateTokens({userId:user._id})
        res.cookie("refreshToken",newRefreshToken,{
            httpOnly:true,
        })
        user.refreshToken=newRefreshToken;
        await user.save();
        res.status(200).json({
            message:"Token refreshed successfully",
            data:{
                accessToken
            }
        })


    }catch(error){
        return res.status(401).json({
            message: "Unauthorized, Invalid or expired refresh token",
        })
    }

  
})

export default router;