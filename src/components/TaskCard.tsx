import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/Card";
import { ICard, ICardType } from "../types";
import { Button } from "./ui/Button";
import TaskDetail from "./TaskDetail";
import { DrawerContent, Drawer as ShadcnDrawer } from "./ui/Drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/Dialog";
import { useState } from "react";
import { DialogHeader, DialogFooter } from "./ui/Dialog";
import DeleteConfirmation from "./DeleteConfirmation";
import { useNavigate } from "react-router-dom";

type Props = {
  card: ICard;
  index: number;
};

const TaskCard = ({ card, index }: Props) => {
  const [open, setOpen] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cardId = urlParams.get("cardId");
    if (cardId && card.cardId === cardId) {
      return true;
    } else {
      return false;
    }
  });
  const [selectedCard, setSelectedCard] = useState<ICard | null>(() => {
    // check if cardId is present in the url
    const urlParams = new URLSearchParams(window.location.search);
    const cardId = urlParams.get("cardId");
    if (cardId && card.cardId === cardId) {
      return card;
    } else {
      return null;
    }
  });
  const [mode, setMode] = useState<"view" | "edit" | "create">(() => {
    // check if mode is present in the url
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get("mode");

    // check if mode is valid
    if (mode === "view" || mode === "edit" || mode === "create") {
      return mode;
    } else {
      return "view";
    }
  });
  const [deleteCard, setDeleteCard] = useState<boolean>(false);
  const navigate = useNavigate();

  const cardClass =
    card.type === ICardType.TODO
      ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
      : card.type === ICardType.IN_PROGRESS
      ? "bg-gradient-to-r from-blue-400 to-blue-600"
      : "bg-gradient-to-r from-green-400 to-green-600";

  const handleView = (card: ICard) => {
    setMode("view");
    setOpen(true);
    setSelectedCard(card);
    // add cardId in the url
    navigate(`/dashboard?cardId=${card.cardId}&mode=view`);
  };
  const handleEdit = (card: ICard) => {
    setMode("edit");
    setOpen(true);
    setSelectedCard(card);
    // add cardId in the url
    navigate(`/dashboard?cardId=${card.cardId}&mode=edit`);
  };
  return (
    <>
      <div>
        <Card
          // add background color with some nice gradient based on cardType
          className={`${cardClass} mb-4`}
        >
          <CardHeader>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </CardHeader>
          <CardContent>Created At: {card.createdAt}</CardContent>
          <CardFooter
            className="gap-4 flex justify-end"
            // add some padding to the footer
          >
            <Button
              onClick={() => {
                handleView(card);
              }}
              variant="default"
            >
              View
            </Button>
            <Button
              onClick={() => {
                handleEdit(card);
              }}
              variant={"secondary"}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                setDeleteCard(true);
              }}
              variant={"destructive"}
            >
              Delete
            </Button>
          </CardFooter>
        </Card>
      </div>
      {selectedCard && (
        <ShadcnDrawer
          direction="right"
          open={open}
          onOpenChange={
            () => {
              setOpen(false);
              setSelectedCard(null);
              setMode("view");
              // remove cardId from the url
              navigate(`/dashboard`);
            
            }
          }
        >
          <DrawerContent className="top-0 right-0 left-auto mt-0 w-[500px] rounded-none">
            {/* <Details open={open} setOpen={setOpen}> */}
            <TaskDetail mode={mode} card={selectedCard} />
            {/* </Details> */}
          </DrawerContent>
        </ShadcnDrawer>
      )}
      {deleteCard && (
        <DeleteConfirmation
          open={deleteCard}
          onOpenChange={setDeleteCard}
          title="Delete Card"
          description="Are you sure you want to delete this card?"
          primaryAction="Delete"
          secondaryAction="Cancel"
          onPrimaryAction={() => {
            console.log("Delete");
          }}
          onSecondaryAction={() => {
            setDeleteCard(false);
          }}
        />
      )}
    </>
  );
};

export default TaskCard;
