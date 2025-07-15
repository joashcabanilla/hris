import { tv } from "tailwind-variants";

export const container = tv({
  base: "container mx-auto p-4 sm:p-6",
  variants: {
    variant: {
      cardCenter: "flex items-center justify-center"
    },
    height: {
      full: "h-full"
    }
  }
});

export const card = tv({
  base: "p-4 shadow-2xl",
  variants: {
    spacing: {
      topbottom: "pt-6 pb-6 mt-4 mb-4"
    },
    width: {
      auth: "w-[400px]"
    }
  }
});

export const input = tv({
  base: "peer h-10 rounded-xl ps-9 indent-1 text-base font-normal"
});

export const inputIcon = tv({
  base: "text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50"
});

export const inputClear = tv({
  base: "text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 transition-[color,box-shadow, opacity] absolute inset-y-0 end-2 flex h-full w-9 items-center justify-center rounded-e-md delay-100 ease-[cubic-bezier(0.42,0,1,1)] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    visibility: {
      show: "cursor-pointer opacity-100",
      hide: "pointer-events-none opacity-0"
    }
  }
});

export const noteCard = tv({
  base: "border-primary bg-primary/3 text-accent-foreground grid gap-2 rounded-2xl border-2 border-double p-2 [&_strong]:font-extrabold font-jetbrains text-sm"
});