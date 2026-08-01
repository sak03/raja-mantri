import { describe, expect, it, vi } from "vitest";
import { playRevealFeedback } from "@/lib/feedback";

describe("playRevealFeedback", () => {
  it("calls vibrate when available", () => {
    const vibrate = vi.fn(() => true);
    playRevealFeedback({ vibrate });
    expect(vibrate).toHaveBeenCalledWith(12);
  });

  it("is a safe no-op when vibrate is undefined", () => {
    expect(() => playRevealFeedback({ vibrate: undefined })).not.toThrow();
  });

  it("never throws even if vibrate throws", () => {
    const vibrate = vi.fn(() => {
      throw new Error("no vibe");
    });
    expect(() => playRevealFeedback({ vibrate })).not.toThrow();
  });

  it("calls optional beep when provided", () => {
    const beep = vi.fn();
    playRevealFeedback({ vibrate: () => true, beep });
    expect(beep).toHaveBeenCalled();
  });
});
