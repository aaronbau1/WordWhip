import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogHeader, DialogFooter, DialogContent, Dialog, DialogClose } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Settings, X } from "lucide-react"
import Link from "next/link"

export function SettingsModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Settings className='h-8 w-8 ml-3 text-white/50 cursor-pointer hover:scale-105 hover:text-white/70
          md:h-10 md:w-10 md:mr-5'
        />
      </DialogTrigger>
      <DialogContent className="dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 px-4">
          <div className="flex items-center justify-between">
            <Label className="text-base" htmlFor="dark-mode">
              Dark Mode
            </Label>
            <Switch id="dark-mode" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center space-x-4" id="difficulty">
              <Label className="text-base" htmlFor="difficulty">
                Difficulty
              </Label>
              <div className="flex items-center gap-4" id="difficulty">
                <Button 
                  className="cursor-pointer hover:bg-green-500 hover:scale-105" id="difficulty-easy" variant="outline"
                >
                  Easy
                </Button>
                <Button
                  className="cursor-pointer hover:bg-yellow-500 hover:scale-105"
                  id="difficulty-medium"
                  variant="outline"
                >
                  Medium
                </Button>
                <Button className="cursor-pointer hover:bg-red-500 hover:scale-105" id="difficulty-hard" variant="outline">
                  Hard
                </Button>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button className="mr-2" variant="outline">
              Cancel
            </Button>
            <Button>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
