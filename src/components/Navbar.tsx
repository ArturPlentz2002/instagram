import { auth, signOut } from "auth";
import Link from "next/link";
import Image from "next/image";
import { getUserByEmail } from "@/actions";
 import Button from "./Button";
 import ButtonLink from "./ButtonLink";
async function Navbar() {
  
  async function Navbar() {
    const session = await auth();
    const user = await getUserByEmail(session?.user.email);

  return (
    <div className="bg-gray-800 text-white px -10 py-5 flex justify-between items-center">
      <Link href="/" className="text-white hover:text-zinc-200 text-lg font-bld">
        Home
      </Link>
      <div>
        {session? (
          <div className="flex gap-4 items-center">
             <p className="text-white font-medium">{user.name}</p>
             {user.image && (
                <Image
                src={user.image}
                alt={user.name}
                width={40}
                height={40}
                className="rounded-full"
                />
              )}

           
           
           <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Sair
              </button>
            </form>
          </div>
        ) : (
          
            <Link href="/signin" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Entrar
            </Link>
  
        )}
      </div>
    </div>
  );
}

export default Navbar;  

