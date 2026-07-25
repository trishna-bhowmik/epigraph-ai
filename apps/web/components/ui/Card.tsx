"use client";

import { HTMLAttributes } from "react";
import clsx from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Card({
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200",
        "hover:shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps
  extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardHeader({
  children,
  className,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={clsx(
        "border-b border-slate-100 px-6 py-5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardTitleProps
  extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function CardTitle({
  children,
  className,
  ...props
}: CardTitleProps) {
  return (
    <h2
      className={clsx(
        "text-lg font-semibold text-slate-900",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

interface CardDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function CardDescription({
  children,
  className,
  ...props
}: CardDescriptionProps) {
  return (
    <p
      className={clsx(
        "mt-1 text-sm text-slate-500",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

interface CardContentProps
  extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardContent({
  children,
  className,
  ...props
}: CardContentProps) {
  return (
    <div
      className={clsx("p-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardFooterProps
  extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardFooter({
  children,
  className,
  ...props
}: CardFooterProps) {
  return (
    <div
      className={clsx(
        "flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}