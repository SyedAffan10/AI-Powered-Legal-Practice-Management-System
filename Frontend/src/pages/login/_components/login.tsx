import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LogIn } from "lucide-react";
import { toast } from "sonner";

// import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLoginMutation } from "@/services/auth/auth-api";
// import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters " })
    .max(16),
});

type SchemaType = z.infer<typeof loginSchema>;

function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SchemaType>({ resolver: zodResolver(loginSchema) });

  const [login] = useLoginMutation();
  const navigate = useNavigate();
  // useEffect(() => {
  //   fetch();
  // }, []);
  // console.log(data);

  // const { data } = useGetUserQuery();
  //     useEffect(()=>{

  // },[])
  const onSubmit = async (data: SchemaType) => {
    console.log(data);

    const res = await login(data);
    if (res) {
      localStorage.setItem("role", "super-admin");
      navigate("/super-admin");
      // window.location.href = "/super-admin";
      return;
    }
    // if (data.email == "agency@gmail.com") {
    //   localStorage.setItem("role", "agency");

    //   window.location.href = "/agency";
    //   return;
    // }
    // if (data.email == "client@gmail.com") {
    //   localStorage.setItem("role", "client");

    //   window.location.href = "/client";
    //   return;
    // }
    // if (data.email == "agent@gmail.com") {
    //   localStorage.setItem("role", "agent");

    //   window.location.href = "/agent";
    //   return;
    // }

    toast.error("User not found");
  };
  return (
    <div className="dark:bg-sidebar text-white bg-[#3C4758]">
      <div className="flex justify-center w-screen h-screen items-center">
        <div className="p-5    md:w-[35%] rounded-sm">
          <div className="w-full border border-sidebar-border bg-sidebar  rounded-xl shadow overflow-hidden p-8 space-y-8">
            <h2 className="text-center text-4xl font-extrabold text-sidebar-foreground">
              Login
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="relative">
                <input
                  placeholder="john@example.com"
                  className="peer h-10 w-full z-20 border-b-2 border-sidebar-border text-sidebar-foreground bg-transparent placeholder-transparent focus:outline-none focus:border-sidebar-foreground"
                  {...register("email", { required: true })}
                  id="email"
                  name="email"
                  type="email"
                />
                <label
                  className="absolute left-0 z-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sidebar-accent-foreground peer-focus:text-sm"
                  htmlFor="email"
                >
                  Email address
                </label>
                {errors.email?.message && (
                  <p className="text-[#FF0000] mt-2 font-bold text-xs">
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div className="relative">
                <input
                  placeholder="Password"
                  className="peer h-10 z-20 w-full border-b-2 border-sidebar-border text-sidebar-foreground bg-transparent placeholder-transparent focus:outline-none focus:border-sidebar-foreground"
                  {...register("password", { required: true })}
                  id="password"
                  name="password"
                  type="password"
                />
                <label
                  className="absolute z-0 left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sidebar-accent-foreground peer-focus:text-sm"
                  htmlFor="password"
                >
                  Password
                </label>
                {errors.password?.message && (
                  <p className="text-[#FF0000] mt-2 font-bold text-xs">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <Button  className="w-full py-2 px-4 " type="submit">
                <LogIn /> Sign In
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
