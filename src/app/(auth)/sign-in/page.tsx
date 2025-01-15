/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function Component() {
  const { data: session } = useSession()
  const [user,setUser]=useState<{email:string,password:string}>({
    email:'',
    password:''
  });
const router=useRouter();
  const loginHandel=async()=>{
try {

 const result= await signIn("credentials",{redirect:false,
  email:user.email,password:user.password
  })

  if(result?.error){
    toast.error({
      description:result.error,
      variant: "destructive",
    })
  }else if(result?.url){
    toast.success({
      title:"Welcome",
      description:"Successfully Login",
    })
    router.replace("/dashboard")
  }
} catch (error) {
  toast({
    title:"Opps !",
    variant: "destructive",
    description:"something went wrong",
  })
}
  }

  const copyToClipboard=()=>{
    navigator.clipboard.writeText(user.email);
  }

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
    <div className="w-[400px] mt-10 mx-auto">
 
    <h1 className="text-center">Not signed in</h1>

  <div>
   <form action="">
        <input type="email" placeholder="Email" className="border disabled:border-red-500 rounded-md border-gray-300 p-2 m-2" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} />
        <input type="password" disabled={user.email === ''} placeholder="password" className="border disabled:border-red-500 rounded-md border-gray-300 p-2 m-2" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} />
   </form>
  </div>
  <div>
  <button className="bg-green-500 py-3 px-4 rounded-md text-white text-xl font-semibold mr-2" onClick={loginHandel}>Sign in</button>
  </div>
</div>

     
    </>
  )
}