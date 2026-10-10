import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProfileIcon } from "@/components/icons";
import { team } from "@/content/text";

export function Team() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="text-3xl font-bold">{team.heading}</h2>
      <p className="mt-1 text-foreground-muted">{team.subheading}</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {team.members.map((member) => (
          <Card key={member.name}>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft">
              <ProfileIcon className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mt-4 font-semibold">{member.name}</h3>
            <p className="text-sm text-foreground-muted">{member.role}</p>
            <p className="mt-2 text-xs text-foreground-muted">{member.certification}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {member.specialties.map((s) => (
                <Badge key={s}>{s}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
