import { Button } from 'antd';
interface ReturnButtonProps {
  onClick?: () => void;
}
export function ReturnButton({ onClick }: ReturnButtonProps) {
  return (
    <Button block type="link" onClick={onClick}>
      <div className="flex items-center justify-center hover:underline">
        <span className="text-sm">Back sign in</span>
      </div>
    </Button>
  );
}
