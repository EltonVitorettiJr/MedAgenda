import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Logo from "../assets/logo.png";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import { type UserType, userSchema } from "../schemas/userSchema";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserType>({
    resolver: yupResolver(userSchema),
  });
  const onSubmit = async (data: UserType) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container-app flex flex-col items-center w-full">
        <img src={Logo} alt="Logo Dr. Omar" className="w-52" />

        <h1 className="text-primary-500 text-4xl font-semibold mb-6">
          Dr. Omar
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
