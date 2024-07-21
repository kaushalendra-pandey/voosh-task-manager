import React, { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { AirplayIcon, Moon, Sun } from "lucide-react";
import { DragDropContext } from "react-beautiful-dnd";
import useAuthenticate from "../../hooks/useAuthenticate";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initTask } from "../../redux/slice/taskSlice";
import { useJwt } from "react-jwt";
import { setLoading } from "../../redux/slice/appSlice";
import { Toaster } from "../ui/Toaster";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const onDragEnd = (result: any) => {
    console.log(result);
  };
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isAuthenticated, onLogut } = useAuthenticate();
  const { decodedToken } = useJwt(localStorage.getItem("at") || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  const fetchUserDetails = async (userId: string) => {
    try {
      setLoading(true);
      //@ts-ignore
      dispatch(initTask(userId));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //@ts-ignore
    if (decodedToken) fetchUserDetails(decodedToken.userId);
  }, [decodedToken]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Toaster />
      {/* Create a fixed top bar */}

      <div
        className="justify-between fixed top-0 left-0 w-full h-16 bg-gray-800 text-white flex items-center justify
        -between px-4"
      >
        {/* Add a logo to left */}
        <div className="text-xl">
          <AirplayIcon size={24} />
        </div>
        {/* Add a logout button to right */}
        <div>
          <Button onClick={onLogut} className="float-right">
            Logout
          </Button>
        </div>
      </div>
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md">
            <div className="text-center">
              <Sun size={32} />
            </div>
            <div className="text-center">Loading...</div>
          </div>
        </div>
      ) : (
        <div className="mt-20 p-4">{children}</div>
      )}
    </DragDropContext>
  );
};

export default Layout;
