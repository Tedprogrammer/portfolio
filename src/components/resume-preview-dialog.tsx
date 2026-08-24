"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const resumePath = "/assets/luong-hieu-trinh-resume.pdf";

export function ResumePreviewDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  function openDialog() {
    setIsClosing(false);
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    if (dialogRef.current?.open && !isClosing) {
      setIsClosing(true);
    }
  }

  return (
    <>
      <button
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent-solid px-6 text-sm font-bold text-accent-foreground transition-[background-color,transform] hover:bg-accent-solid-hover active:scale-[0.96]"
        onClick={openDialog}
        type="button"
      >
        View resume
      </button>

      <dialog
        aria-labelledby="resume-dialog-title"
        className="resume-preview-dialog m-auto h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-4xl overflow-hidden rounded-2xl border border-border bg-background p-0 text-foreground shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm open:flex open:flex-col sm:h-[calc(100dvh-4rem)]"
        data-closing={isClosing}
        onAnimationEnd={(event) => {
          if (event.animationName === "resume-dialog-exit") {
            dialogRef.current?.close();
            setIsClosing(false);
          }
        }}
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        ref={dialogRef}
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-border px-4 py-3 sm:px-5 sm:py-4">
          <div className="flex min-w-0 items-center gap-3">
            <span
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 font-mono text-[0.65rem] font-bold text-accent-hover"
            >
              PDF
            </span>
            <div className="min-w-0">
              <h2
                className="truncate text-sm font-bold text-foreground sm:text-base"
                id="resume-dialog-title"
              >
                Luong Hieu Trinh - Resume
              </h2>
              <p className="mt-0.5 font-mono text-xs text-subtle">1 page</p>
            </div>
          </div>

          <button
            aria-label="Close resume preview"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-[border-color,color,transform] hover:border-accent hover:text-accent active:scale-[0.96]"
            onClick={closeDialog}
            type="button"
          >
            <svg
              aria-hidden="true"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="m6 6 12 12M18 6 6 18"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
            </svg>
          </button>
        </header>

        <div className="flex shrink-0 flex-wrap gap-2 border-b border-border px-3 py-3 sm:px-5">
          <a
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-bold text-foreground transition-[border-color,color,transform] hover:border-accent hover:text-accent active:scale-[0.96]"
            href={resumePath}
            rel="noreferrer"
            target="_blank"
          >
            <svg
              aria-hidden="true"
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M14 5h5v5M10 14 19 5M19 14v5H5V5h5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            Open PDF
          </a>
          <a
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent-solid px-4 text-sm font-bold text-accent-foreground transition-[background-color,transform] hover:bg-accent-solid-hover active:scale-[0.96]"
            download
            href={resumePath}
          >
            <svg
              aria-hidden="true"
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 3v12M7 10l5 5 5-5M5 21h14"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            Download
          </a>
        </div>

        <div className="resume-preview-scroll min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain bg-surface p-3 sm:p-5">
          <a
            aria-label="Open resume PDF in a new tab"
            className="group mx-auto block max-w-3xl"
            href={resumePath}
            rel="noreferrer"
            target="_blank"
          >
            <Image
              alt="Preview of Luong Hieu Trinh's resume"
              className="block h-auto w-full rounded-lg bg-white shadow-lg shadow-black/10 outline-1 -outline-offset-1 outline-black/10 transition-transform group-active:scale-[0.99]"
              height={1600}
              sizes="(min-width: 768px) 48rem, calc(100vw - 3.5rem)"
              src="/assets/luong-hieu-trinh-resume.pdf.png"
              width={1236}
            />
          </a>
        </div>
      </dialog>
    </>
  );
}
