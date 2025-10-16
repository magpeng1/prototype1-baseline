import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Save, BookOpen } from "lucide-react";

interface Entry {
  id: string;
  text: string;
  date: string;
}

const JournalEntry = () => {
  const [entryText, setEntryText] = useState("");
  const [entries, setEntries] = useState<Entry[]>(() => {
    const saved = localStorage.getItem("journal-entries");
    return saved ? JSON.parse(saved) : [];
  });

  const handleSave = () => {
    if (!entryText.trim()) {
      toast.error("Please write something before saving");
      return;
    }

    const newEntry: Entry = {
      id: Date.now().toString(),
      text: entryText,
      date: new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem("journal-entries", JSON.stringify(updatedEntries));
    setEntryText("");
    toast.success("Entry saved ✨");
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-subtle p-4 sm:p-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-3">
            <BookOpen className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-serif font-semibold text-foreground">
              Journl
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">{today}</p>
        </div>

        {/* Writing Area */}
        <Card className="mb-6 p-6 shadow-soft border-border bg-card animate-scale-in">
          <Textarea
            value={entryText}
            onChange={(e) => setEntryText(e.target.value)}
            placeholder="What's on your mind today?"
            className="min-h-[200px] border-0 p-0 text-base font-serif leading-relaxed resize-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60 bg-transparent"
          />
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {entryText.length} characters
            </span>
            <Button
              onClick={handleSave}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Entry
            </Button>
          </div>
        </Card>

        {/* Past Entries */}
        {entries.length > 0 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-lg font-medium text-foreground mb-4">
              Past Entries
            </h2>
            {entries.map((entry, index) => (
              <Card
                key={entry.id}
                className="p-5 shadow-card border-border bg-card hover:shadow-soft transition-shadow duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <p className="text-xs text-muted-foreground mb-2">
                  {entry.date}
                </p>
                <p className="text-sm font-serif text-foreground leading-relaxed whitespace-pre-wrap">
                  {entry.text}
                </p>
              </Card>
            ))}
          </div>
        )}

        {entries.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-muted-foreground text-sm">
              No entries yet. Start writing to save your first memory.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalEntry;
