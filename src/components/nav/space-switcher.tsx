import * as React from "react";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import supabase from "@/config/supabase";
import { Loader2 } from "lucide-react";
import { useUser } from "../providers/auth-provider";
import { useStudies } from "../providers/space-provider";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function SpaceSwitcher({ className }: TeamSwitcherProps) {
  const { studies, setStudies, loading, selectedTeam, setSelectedTeam } =
    useStudies();
  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
  const [name, setName] = React.useState<string>("");
  const { user } = useUser();

  React.useEffect(() => {
    if (!studies?.length && !loading) {
      setShowNewTeamDialog(true);
    }
  }, [studies]);

  const createNewSpace = async () => {
    if (!name.length) return;

    const { data, error } = await supabase
      .from("studies")
      .insert({ name: name, user_id: user?.id })
      .select("*");

    if (error) return;

    if (data.length) {
      if (Array.isArray(studies)) {
        setStudies([...studies, ...data]);
        setSelectedTeam(data[0]);
      }
      setShowNewTeamDialog(false);
    }
  };

  return (
    <Dialog open={showNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("sm:w-[30%] w-[70%] justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarFallback>{selectedTeam?.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
            {selectedTeam?.name}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandList>
              <CommandGroup key="studies" heading="Studies">
                {studies &&
                  studies.map((team) => (
                    <CommandItem
                      key={team.id}
                      onSelect={() => {
                        window.localStorage.setItem("studyId", team.id);
                        setSelectedTeam(team);
                        setOpen(false);
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${team.name}.png`}
                          alt={team.name}
                          className="grayscale"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {team.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedTeam?.id === team.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Create study
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create study workspace</DialogTitle>
          <DialogDescription>
            Add a new workspace to manage studies and plans.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Workspace name</Label>
              <Input
                id="name"
                placeholder="System design, history of Ottoman, etc"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          {!!studies?.length && studies.length > 0 && (
            <Button
              variant="outline"
              onClick={() => {
                setShowNewTeamDialog(false);
              }}
            >
              Cancel
            </Button>
          )}
          <Button
            disabled={loading}
            onClick={() => createNewSpace()}
            type="submit"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
