import { WebhookHeader } from './header/WebhookHeader';
import { WebhookContent } from './content/WebhookContent';

export function WebhookInspector() {
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <WebhookHeader />
      <WebhookContent />
    </div>
  );
}