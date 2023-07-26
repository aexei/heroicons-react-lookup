import { PossibleIcons } from "./possibleIcons"

export { PossibleIcons, PossibleIconsArray } from "./possibleIcons"

export type IconFormat = "solid" | "outline" | "mini"

/**
 * An icon from the heroicons library.
 */
export type HeroIcon = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
    title?: string
    titleId?: string
  } & React.RefAttributes<SVGSVGElement>
>

/**
 * A map of all the icons from the heroicons library.
 */
export type Lookup = { [key in PossibleIcons]: HeroIcon }
