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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { Toaster } from "../ui/Toaster";
import { Loader2 } from "lucide-react";
import { set } from "date-fns";
import { toast } from "../../hooks/useToast";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const { isAuthenticated, onLogin, onGoogleLoginError, onGoogleLoginSuccess } =
    useAuthenticate();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  const handleLogin = async (data: any) => {
    try {
      setLoading(true);
      await onLogin(data);
      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error?.data?.message || "Something went wrong",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex justify-center items-center h-screen bg-gray-100"
      >
        <div>
          <GoogleLogin
            onSuccess={onGoogleLoginSuccess}
            onError={onGoogleLoginError}
            size="large"
            width="800px"
          />

          <Card className="w-[400px] mt-2">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login to task tracker</CardDescription>
            </CardHeader>
            <CardContent>
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", {
                  required: true,
                })}
                className="mb-2"
              />
              {errors.name && <ErrorMessage>Email is Required</ErrorMessage>}
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
              <Button disabled={loading} type="submit" className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Hang on...
                  </>
                ) : (
                  "Login"
                )}
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
