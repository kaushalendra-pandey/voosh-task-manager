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

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isAuthenticated, onLogin, onSignup } = useAuthenticate();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <form
      onSubmit={handleSubmit(onSignup)}
      className="flex justify-center items-center h-screen bg-gray-100"
    >
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>Never miss a deadline again</CardDescription>
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
          <Label htmlFor="name">Email</Label>
          <Input
            {...register("email", {
              required: true,
            })}
            className="mb-2"
            type="email"
          />
          {errors.email && <ErrorMessage>Email is required</ErrorMessage>}
          <br />
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password", {
              required: true,
            })}
            type="password"
          />
          {errors.password && <ErrorMessage>Password is required</ErrorMessage>}
          <br />
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            {...register("confirmPassword", {
              required: true,
            })}
            type="password"
          />
          {errors.confirmPassword && (
            <ErrorMessage>Password is required</ErrorMessage>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit" className="w-full">
            Singup
          </Button>
        </CardFooter>
        <CardDescription className="px-6">
          Already have an account ?
          <Button variant="link" onClick={() => navigate("/login")}>
            Login
          </Button>
        </CardDescription>
      </Card>
    </form>
  );
};

export default Signup;
