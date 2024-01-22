import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog"

export function InfoModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Modal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Game Instructions</DialogTitle>
          <DialogDescription>Follow these steps to play the game. Click close when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm leading-7">Step 1: Choose your character from the selection screen.</p>
          <p className="text-sm leading-7">Step 2: Navigate through the game world using the arrow keys.</p>
          <p className="text-sm leading-7">Step 3: Collect power-ups and avoid enemies to increase your score.</p>
          <p className="text-sm leading-7">Step 4: Reach the end of the level to progress to the next stage.</p>
        </div>
        <DialogFooter>
          <div>
            <Button variant="outline">Got it!</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
