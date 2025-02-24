"use client";

import { User } from "types/User";
import { useFormState } from "react-dom";
import { updateUserProfile } from "@/actions";

type ProfileFormProps = {
    user: User;
  };
  
  const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
    const [formState, formAction] = useFormState(updateUserProfile, {
      message: "",
      type: "success",
    });
    return <div>
        {}
    </div>