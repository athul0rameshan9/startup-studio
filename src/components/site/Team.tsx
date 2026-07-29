import { Media } from "@/components/ui/Media";
import type { TeamContent } from "@/lib/content/schema";

export function TeamSection({ team }: { team: TeamContent }) {
  return (
    <section className="border-y border-line bg-white px-6 py-[var(--om-pad-sm,80px)] lg:px-8">
      <div className="mx-auto max-w-[1200px]">
        {team.eyebrow ? (
          <div className="mb-[18px] font-mono text-[13px] tracking-[0.14em] text-[var(--om-green)]">
            {team.eyebrow}
          </div>
        ) : null}

        <blockquote className="m-0 mb-11 max-w-[900px] text-[20px] leading-[1.45] tracking-[-0.02em] text-pretty sm:text-[23px] lg:text-[26px]">
          {team.quote}
        </blockquote>

        <div className="grid max-w-[820px] grid-cols-1 gap-8 sm:grid-cols-2">
          {team.members.map((member) => (
            <div key={member.name} className="flex items-center gap-5">
              <Media
                src={member.photo}
                alt={`${member.name} portrait`}
                width={96}
                height={110}
                className="block h-[110px] w-24 flex-none rounded-2xl object-cover"
              />
              <div>
                <div className="text-[17px] font-bold">{member.name}</div>
                <div className="mt-[3px] text-[15px] text-body">
                  {member.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
