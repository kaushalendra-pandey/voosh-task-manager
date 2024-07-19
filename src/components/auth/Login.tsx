import { Button } from "../ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../ui/ErrorMessage";
import useAuthenticate from "../../hooks/useAuthenticate";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isAuthenticated, onLogin, onGoogleLoginError, onGoogleLoginSuccess } =
    useAuthenticate();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onLogin)}
        className="flex justify-center items-center h-screen bg-gray-100"
      >
        <div>
          <GoogleLogin
            onSuccess={onGoogleLoginSuccess}
            onError={onGoogleLoginError}
            size="large"
            width="800px"
          />
        
          <Card className="w-[500px] mt-2">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login to task tracker</CardDescription>
            </CardHeader>
            <CardContent>
              <Label htmlFor="name">Name</Label>
              <Input
                {...register("name", {
                  required: true,
                })}
                className="mb-2"
              />
              {errors.name && <ErrorMessage>Name is required</ErrorMessage>}
              <br />
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password", {
                  required: true,
                })}
                type="password"
              />
              {errors.password && (
                <ErrorMessage>Password is required</ErrorMessage>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="submit" className="w-full">
                Login
              </Button>
            </CardFooter>
            <CardDescription className="px-6">
              Dont't have an account ?
              <Button variant="link" onClick={() => navigate("/signup")}>
                Signup
              </Button>
            </CardDescription>
          </Card>
        </div>
      </form>
    </>
  );
};

export default Login;
