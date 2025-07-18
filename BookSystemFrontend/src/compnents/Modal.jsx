import Button from "./Button"

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(104,100,100,0.7)] transition">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-4 md:p-6 m-2 relative">
        <Button
          onClick={onClose}
        >
          ✕
        </Button>
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        <div>{children}</div>
      </div>
    </div>
  )
}