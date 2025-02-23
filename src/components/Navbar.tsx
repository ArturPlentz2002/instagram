import { auth, signOut } from "auth";
import Link from "next/link";
import Image from "next/image";
import { getUserByEmail } from "@/actions";
// import Button from "./Button";
// import ButtonLink from "./ButtonLink";
async function Navbar() {
  const session = await auth();

  const user = session ? await getUserByEmail(session.user.email) : null;

  return (
    <div className="bg-gray-800 text-white px -10 py-5 flex justify-between items-center">
      <Link href="/" className="text-white hover:text-zinc-200 text-lg font-bld">
        Home
      </Link>
      <div>
        {session && session.user ? (
          <div className="flex gap-4 items-center">
            <p>{session.user.name}</p>
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

