import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Logo from "../assets/logo.png";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";
import { type UserType, userSchema } from "../schemas/userSchema";

const Login = () => {
  const navigate = useNavigate();
  const { logInSupabase } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserType>({
    resolver: yupResolver(userSchema),
  });
  const onSubmit = async (data: UserType) => {
    const error = await logInSupabase(data);

    if (error) {
      console.error(error);
      toast.error("E-mail ou senha incorretos.");
      return;
    }

    toast.success("Login realizado com sucesso!");
    setTimeout(() => {
      navigate("/agenda");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container-app flex flex-col items-center w-full">
        <img src={Logo} alt="Logo Dr. Omar" className="w-52" />

        <h1 className="text-primary-500 text-4xl font-semibold mb-6">
          MedAgenda
        </h1>

        <Card hover className="w-full max-w-md h-fit">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Input
                label="Email"
                {...register("email")}
                type="email"
                placeholder="exemplo@email.com"
                error={!!errors.email}
              />
              <span className="text-red-500 min-h-5 text-sm">
                {errors.email?.message}
              </span>
            </div>

            <div className="mb-2">
              <Input
                label="Senha"
                {...register("password")}
                type="password"
                placeholder="••••••••"
                error={!!errors.password}
              />
              <span className="text-red-500 min-h-5 text-sm">
                {errors.password?.message}
              </span>
            </div>

            <Button type="submit" fullWidth isLoading={isSubmitting}>
              Entrar
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
