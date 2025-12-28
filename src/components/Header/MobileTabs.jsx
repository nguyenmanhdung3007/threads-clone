export function MobileTabs({ active, onChange }) {
  return (
    <div className="flex sm:hidden border-b">
      <button
        className={clsx(
          "flex-1 py-3 text-sm",
          active === "for-you"
            ? "font-semibold border-b-2 border-black"
            : "text-gray-400"
        )}
        onClick={() => onChange("for-you")}
      >
        For you
      </button>

      <button
        className={clsx(
          "flex-1 py-3 text-sm",
          active === "following"
            ? "font-semibold border-b-2 border-black"
            : "text-gray-400"
        )}
        onClick={() => onChange("following")}
      >
        Following
      </button>
    </div>
  );
}
