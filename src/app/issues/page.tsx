import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function IssuesPage() {
  return (
    <section>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-700">
            Issues
          </h1>
        </div>
      </div>
      <div>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Button>
            <Link href="/issues/new">New Issue</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
