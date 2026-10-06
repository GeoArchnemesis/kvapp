import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

type TeamMember = {
  name: string;
  role: string;
  certification: string;
  specialties: string[];
};

const team: TeamMember[] = [
  {
    name: "ნინო ბერიძე",
    role: "სერტიფიცირებული დიეტოლოგი",
    certification: "კლინიკური კვების დიპლომი, თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი",
    specialties: ["წონის მართვა", "ქართული სამზარეულოს ადაპტაცია"],
  },
  {
    name: "გიორგი მაისურაძე",
    role: "სერტიფიცირებული პირადი მწვრთნელი",
    certification: "ISSA-ს სერტიფიცირებული პირადი მწვრთნელი",
    specialties: ["ძალოვანი ვარჯიში", "დამწყებთათვის"],
  },
  {
    name: "თამარ ხარაზიშვილი",
    role: "სერტიფიცირებული დიეტოლოგი",
    certification: "Precision Nutrition L1",
    specialties: ["ჩვევების დანერგვა", "ჰორმონალური ჯანმრთელობა"],
  },
];

export function Team() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="text-2xl font-bold">გაიცანით ჩვენი გუნდი</h2>
      <p className="mt-1 text-foreground-muted">
        სერტიფიცირებული დიეტოლოგები და მწვრთნელები — ხელმისაწვდომია „პრო“ პაკეტიდან.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {team.map((member) => (
          <Card key={member.name}>
            <div className="h-12 w-12 rounded-full bg-accent-soft" />
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
