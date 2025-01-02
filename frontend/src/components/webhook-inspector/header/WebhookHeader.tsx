import { WebhookUrlInput } from './WebhookUrlInput';
import { Link } from 'lucide-react';

export function WebhookHeader() {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <Link className="w-8 h-8" />
        Hook Inspector
      </h1>
      <WebhookUrlInput />
    </div>
  );
}