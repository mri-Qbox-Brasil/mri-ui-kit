
import { MriActionModal } from "./MriActionModal";
import { AlertTriangle, Info, Trash2 } from "lucide-react";

import { useState } from "react";
import { MriButton } from "../atoms/MriButton";

export default {
  title: "Molecules/MriActionModal",
  component: MriActionModal,
  tags: ['autodocs'],
};

const ActionModalDemo = ({ title, icon, variant, children, confirmLabel }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <MriButton onClick={() => setOpen(true)} variant={variant === "warning" ? "default" : variant || "default"}>
        Open {title} Modal
      </MriButton>
      {open && (
        <MriActionModal
          title={title}
          icon={icon}
          variant={variant}
          onClose={() => setOpen(false)}
          onConfirm={() => {
            console.log("Confirmed!");
            setOpen(false);
          }}
          confirmLabel={confirmLabel}
        >
          {children}
        </MriActionModal>
      )}
    </>
  );
};

export const Default = {
  render: () => (
    <ActionModalDemo title="Information" icon={Info}>
      <div>This is a generic action modal.</div>
    </ActionModalDemo>
  ),
};

export const Warning = {
  render: () => (
    <ActionModalDemo title="Warning" icon={AlertTriangle} variant="warning">
      <div>Are you sure you want to proceed with this warning?</div>
    </ActionModalDemo>
  ),
};

export const Destructive = {
  render: () => (
    <ActionModalDemo title="Delete Item" icon={Trash2} variant="destructive" confirmLabel="Delete">
      <div>This action cannot be undone. Please confirm.</div>
    </ActionModalDemo>
  ),
};

