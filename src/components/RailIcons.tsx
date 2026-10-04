





import { House, FolderOpen, Stack, Coffee, User, ChatCircle, type Icon } from '@/components/slab'

type IconProps = { size?: number }

function wrap(Glyph: Icon) {
  return function RailIcon({ size = 18 }: IconProps) {
    return (
      <span className="ricon ricon--slab" aria-hidden="true">
        <Glyph size={size} className="ricon__whole" />
      </span>
    )
  }
}

export const HomeIcon = wrap(House)
export const FolderIcon = wrap(FolderOpen)
export const StackIcon = wrap(Stack)
export const CupIcon = wrap(Coffee)
export const UserIcon = wrap(User)
export const MessageIcon = wrap(ChatCircle)
