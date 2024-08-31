import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { IconType } from "react-icons";
import { RiLockPasswordFill } from "react-icons/ri";
import Login1 from "@/components/logins/Login1";


export default function Home() {
  return (
    <>
       <form action="/admin/" method="post">
         <Login1 />
       </form>
    </>
  );
}
