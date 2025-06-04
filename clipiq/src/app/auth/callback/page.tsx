//clerk on successful authentication alows us to send a webhook response
//but since in development mode in clerk(localhost) we are not able to send webhook response
// therefore using env - which will lead to this callback page
//NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/auth/callback
//NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/auth/callback
//Clerk’s React components and hooks (like <SignIn />, <SignUp />, or useSignIn()) will use these values automatically for post-auth redirects.

import { onAuthenticated } from '@/app/actions/user';
import { redirect } from 'next/navigation';


const AuthCallbackPage = async() => {
   //checking authentication
   const auth =await onAuthenticated();
   if(auth.status === 200 || auth.status === 201){
        return redirect(`/dashboard/${auth.user?.workspace[0].id}`)
    }
   if(auth.status==403 || auth.status==400 || auth.status==500 || auth.status==400) {
      return redirect('/');
    }
}

export default AuthCallbackPage;
