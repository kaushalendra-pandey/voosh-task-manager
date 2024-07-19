import React, { useEffect } from "react";
import { Button } from "../ui/Button";
import { AirplayIcon, Moon, Sun } from "lucide-react";
import { DragDropContext } from "react-beautiful-dnd";
import useAuthenticate from "../../hooks/useAuthenticate";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const onDragEnd = (result: any) => {
    console.log(result);
  };

  const navigate = useNavigate();

  const { isAuthenticated, onLogut } = useAuthenticate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
          <Button onClick={onLogut} className="float-right">Logout</Button>
        </div>
      </div>
      <div className="mt-20 p-4">{children}</div>
    </DragDropContext>
  );
};

export default Layout;
