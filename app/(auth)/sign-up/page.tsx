'use client'
import React from 'react'
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import InputField from '@/components/forms/InputField'
import SelectField from '@/components/forms/SelectField'
import { CountrySelectField } from '@/components/forms/CountrySelectField'
import { INVESTMENT_GOALS, RISK_TOLERANCE_OPTIONS, PREFERRED_INDUSTRIES } from '@/lib/constants'
import FooterLink from '@/components/forms/FooterLink'

const SignUp = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
      } = useForm<SignUpFormData>({
        defaultValues: { fullName: "", email: "", password: "", country: "HU", investmentGoals: "Growth", riskTolerance: "Medium", preferredIndustry: "Technology" },
        mode: "onBlur",
      })
    
      const onSubmit = async (data: SignUpFormData) => {
        try {
            console.log(data)
        } catch (error) {
            console.error(error)
        }
      }

    return (
        <>
            <h1 className="form-title">
                Sign Up & Personalize
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField name="fullName" label="Full Name" placeholder="Enter your full name" register={register} error={errors.fullName} validation={{ required: "Full name is required", minLength: { value: 3, message: "Full name must be at least 3 characters long" } }}/>
                <InputField name="email" label="Email" placeholder="Enter your email" register={register} error={errors.email} validation={{ required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } }}/>
                <InputField name="password" label="Password" placeholder="Enter your password" type="password" register={register} error={errors.password} validation={{ required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters long" } }}/>
                <CountrySelectField name="country" label="Country" control={control} error={errors.country} required/>
                <SelectField name="investmentGoals" label="Investment Goals" placeholder="Select your investment goals" options={INVESTMENT_GOALS} control={control} error={errors.investmentGoals} required/>
                <SelectField name="riskTolerance" label="Risk Tolerance" placeholder="Select your risk tolerance" options={RISK_TOLERANCE_OPTIONS} control={control} error={errors.riskTolerance} required/>
                <SelectField name="preferredIndustry" label="Preferred Industry" placeholder="Select your preferred industry" options={PREFERRED_INDUSTRIES} control={control} error={errors.preferredIndustry} required/>
                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? "Creating account..." : "Start Your Investing Journey"}
                </Button>
                <FooterLink text="Already have an account?" linkText="Sign in" href="/sign-in"/>
            </form>
        </>
  )
}

export default SignUp