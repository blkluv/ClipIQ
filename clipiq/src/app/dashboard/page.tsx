import { onAuthenticated } from '@/app/actions/user';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {}

const DashboardPage = async(props:Props) => {
   //checking authentication
   const auth =await onAuthenticated();
   if(auth.status === 200 || auth.status === 201){
        return redirect(`/dashboard/${auth.user?.workspace[0].id}`)
    }
   if(auth.status==403 || auth.status==400 || auth.status==500 || auth.status==400) {
      return redirect('auth/sign-in');
    }
}

export default DashboardPage;
