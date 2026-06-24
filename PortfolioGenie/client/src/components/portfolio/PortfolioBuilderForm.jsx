import { useEffect, useState } from "react";
import {
  FiBriefcase,
  FiCode,
  FiExternalLink,
  FiMail,
  FiPlus,
  FiRefreshCw,
  FiTrash2,
  FiUser,
  FiX,
} from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { generatePortfolioDraft, savePortfolio } from "../../services/portfolioAPI";

const emptyEducation = {
  institution: "",
  degree: "",
  field: "",
  startDate: "",
  endDate: "",
  description: "",
};

const emptyExperience = {
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  description: "",
};

const sectionLinks = [
  { id: "personal", label: "Personal Info", icon: FiUser },
  { id: "about", label: "About Me", icon: FiUser },
  { id: "services", label: "My Services", icon: FiBriefcase },
  { id: "education", label: "Education", icon: FiBriefcase },
  { id: "experience", label: "Experience", icon: FiBriefcase },
  { id: "skills", label: "Skills", icon: FiCode },
  { id: "projects", label: "Projects", icon: FiBriefcase },
  { id: "contact", label: "Contact", icon: FiMail },
];

const normalizeUrl = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
};

const unique = (items) => {
  const seen = new Set();
  return items.filter((item) => {
    const key = item.trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const getInitialProjects = (repos) =>
  repos
    .filter((repo) => !repo.fork)
    .slice(0, 4)
    .map((repo) => ({
      name: repo.name || "",
      description: repo.description || "",
      technologies: unique([repo.language, ...(repo.topics || [])].filter(Boolean)),
      repoUrl: repo.html_url || repo.url || "",
      liveUrl: repo.homepage || "",
    }));

const getInitialSkills = (repos, userData) => {
  const repoSkills = repos.flatMap((repo) => [
    repo.language,
    ...(repo.topics || []),
  ]);

  return unique([...(userData?.skills || []), ...repoSkills].filter(Boolean)).slice(0, 24);
};

const buildInitialForm = ({ profile, repos, userData, email = "" }) => {
  const name = profile?.name || userData?.name || profile?.login || "";
  const githubUrl = profile?.html_url || (profile?.login ? `https://github.com/${profile.login}` : "");

  return {
    personalInfo: {
      fullName: name,
      professionalTitle: "",
      email,
      github: githubUrl,
      linkedin: "",
      location: profile?.location || "",
    },
    aboutMe: profile?.bio || "",
    services: ["Web application development", "Frontend development", "API integration"],
    education: [{ ...emptyEducation }],
    experience: [{ ...emptyExperience }],
    skills: getInitialSkills(repos, userData),
    projects: getInitialProjects(repos),
    contact: {
      email,
      github: githubUrl,
      linkedin: "",
      phone: "",
      location: profile?.location || "",
    },
  };
};

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-purple-500 dark:border-white/10 dark:bg-[#141414] dark:text-white"
      />
    </label>
  );
}

function TextArea({ label, value, onChange, placeholder, rows = 4 }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </span>
      <textarea
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full resize-y rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-sm leading-6 text-gray-950 outline-none transition focus:border-purple-500 dark:border-white/10 dark:bg-[#141414] dark:text-white"
      />
    </label>
  );
}

function Section({ id, icon: Icon, title, subtitle, children, action }) {
  return (
    <section
      id={id}
      className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-[#292929] dark:bg-[#0b0b0b]"
    >
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-950 dark:text-white">
            <Icon size={19} />
            <h2>{title}</h2>
          </div>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function TagInput({ tags, onChange, placeholder = "Add a skill..." }) {
  const [draft, setDraft] = useState("");

  const addTag = () => {
    const nextTag = draft.trim();
    if (!nextTag) return;
    onChange(unique([...tags, nextTag]));
    setDraft("");
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addTag();
            }
          }}
          placeholder={placeholder}
          className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-950 outline-none focus:border-purple-500 dark:border-white/10 dark:bg-[#141414] dark:text-white"
        />
        <button
          type="button"
          onClick={addTag}
          aria-label="Add tag"
          className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#070719] text-white transition hover:bg-purple-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          <FiPlus size={20} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-950 dark:bg-[#252525] dark:text-white"
          >
            {tag}
            <button
              type="button"
              onClick={() => onChange(tags.filter((item) => item !== tag))}
              aria-label={`Remove ${tag}`}
              className="text-gray-500 hover:text-red-500 dark:text-gray-300"
            >
              <FiX size={13} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

function PortfolioBuilderForm({ profile, repos, userData }) {
  const [form, setForm] = useState(() =>
    buildInitialForm({ profile, repos, userData })
  );
  const [loadingDraft, setLoadingDraft] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [savedJson, setSavedJson] = useState(null);

  const [portfolioTitle, setPortfolioTitle] = useState(() => {
    const name = profile?.login || "Developer";
    return `${name}'s Portfolio`;
  });

  const applyAIData = (email, ai) => {
    setForm((current) => {
      const projectMap = new Map(current.projects.map((project) => [project.repoUrl, project]));
      const mergedProjects = (ai.projects?.length ? ai.projects : current.projects).map((project) => {
        const existing = projectMap.get(project.repoUrl) || {};
        return {
          ...existing,
          ...project,
          technologies: project.technologies?.length ? project.technologies : existing.technologies || [],
        };
      });

      return {
        ...current,
        personalInfo: {
          ...current.personalInfo,
          email,
          professionalTitle: current.personalInfo.professionalTitle || ai.suggestedTitle || "",
        },
        contact: {
          ...current.contact,
          email,
        },
        aboutMe: ai.aboutMe || current.aboutMe,
        services: ai.services?.length ? ai.services : current.services,
        skills: ai.skills?.length ? ai.skills : current.skills,
        projects: mergedProjects,
      };
    });
  };

  const loadDraft = async () => {
    setLoadingDraft(true);
    setError("");

    try {
      const data = await generatePortfolioDraft({ profile, repos });
      applyAIData(data.email, data.ai);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingDraft(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadDraft();
    }, 0);

    return () => window.clearTimeout(timer);
    // The initial draft should be requested once for the submitted GitHub profile.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePersonal = (key, value) => {
    setForm((current) => ({
      ...current,
      personalInfo: { ...current.personalInfo, [key]: value },
    }));
  };

  const updateContact = (key, value) => {
    setForm((current) => ({
      ...current,
      contact: { ...current.contact, [key]: value },
    }));
  };

  const updateListItem = (listKey, index, key, value) => {
    setForm((current) => ({
      ...current,
      [listKey]: current[listKey].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item
      ),
    }));
  };

  const removeListItem = (listKey, index) => {
    setForm((current) => ({
      ...current,
      [listKey]: current[listKey].filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const addListItem = (listKey, item) => {
    setForm((current) => ({
      ...current,
      [listKey]: [...current[listKey], item],
    }));
  };

  const handleContinue = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    const finalData = {
      ...form,
      metadata: {
        source: "github-ai-builder",
        githubUsername: profile.login,
        generatedAt: new Date().toISOString(),
      },
    };

    try {
      const result = await savePortfolio({
        title: portfolioTitle,
        githubUsername: profile.login,
        data: finalData,
      });

      const nextPayload = {
        portfolioId: result.portfolio.id,
        ...finalData,
      };

      localStorage.setItem("portfolioGenie:lastPortfolioDraft", JSON.stringify(nextPayload));
      setSavedJson(nextPayload);
      setSuccess("Portfolio saved. The JSON payload is ready for the next step.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 text-gray-950 transition-colors dark:bg-[#030716] dark:text-white">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[400px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-[#292929] dark:bg-[#0b0b0b]">
            <div className="mb-8 flex items-center gap-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                <BsStars size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold">Portfolio Sections</h1>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Review and personalize your draft
                </p>
              </div>
            </div>
            <nav className="space-y-2">
              {sectionLinks.map(({ id, label, icon: Icon }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => handleScroll(e, id)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-purple-700 dark:text-gray-200 dark:hover:bg-white/5 dark:hover:text-purple-300"
                >
                  <Icon size={17} />
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <div className="space-y-6">
          {loadingDraft && (
            <div className="rounded-xl border border-purple-200 bg-purple-50 px-5 py-4 text-sm font-medium text-purple-800 dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-purple-200">
              Generating your portfolio draft from GitHub...
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-200">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-200">
              {success}
            </div>
          )}

          <Section
            id="personal"
            icon={FiUser}
            title="Personal Information"
            subtitle="Your basic contact and profile information"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Full Name" value={form.personalInfo.fullName} onChange={(value) => updatePersonal("fullName", value)} />
              <Field label="Professional Title" value={form.personalInfo.professionalTitle} onChange={(value) => updatePersonal("professionalTitle", value)} placeholder="Full Stack Developer" />
              <div className="md:col-span-2">
                <Field label="Email" value={form.personalInfo.email} onChange={(value) => updatePersonal("email", value)} type="email" />
              </div>
              <Field label="LinkedIn" value={form.personalInfo.linkedin} onChange={(value) => updatePersonal("linkedin", value)} placeholder="https://linkedin.com/in/username" />
              <Field label="GitHub" value={form.personalInfo.github} onChange={(value) => updatePersonal("github", value)} />
              <div className="md:col-span-2">
                <Field label="Location" value={form.personalInfo.location} onChange={(value) => updatePersonal("location", value)} placeholder="City, Country" />
              </div>
            </div>
          </Section>

          <Section
            id="about"
            icon={FiUser}
            title="About Me"
            subtitle="Tell your story and showcase your strengths"
            action={
              <button
                type="button"
                onClick={loadDraft}
                disabled={loadingDraft}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold transition hover:bg-gray-100 disabled:opacity-60 dark:border-white/10 dark:hover:bg-white/5"
              >
                <FiRefreshCw size={15} />
                Regenerate
              </button>
            }
          >
            <TextArea value={form.aboutMe} onChange={(value) => setForm((current) => ({ ...current, aboutMe: value }))} rows={5} />
          </Section>

          <Section id="services" icon={FiBriefcase} title="My Services" subtitle="What you can offer clients or employers">
            <div className="space-y-3">
              {form.services.map((service, index) => (
                <div key={`${service}-${index}`} className="flex gap-2">
                  <input
                    value={service}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        services: current.services.map((item, itemIndex) =>
                          itemIndex === index ? event.target.value : item
                        ),
                      }))
                    }
                    className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-sm outline-none focus:border-purple-500 dark:border-white/10 dark:bg-[#141414]"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        services: current.services.filter((_, itemIndex) => itemIndex !== index),
                      }))
                    }
                    aria-label="Remove service"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 text-red-500 transition hover:bg-red-50 dark:border-white/10 dark:hover:bg-red-500/10"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setForm((current) => ({ ...current, services: [...current.services, ""] }))}
                className="inline-flex items-center gap-2 rounded-lg bg-[#070719] px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                <FiPlus size={16} />
                Add Service
              </button>
            </div>
          </Section>

          <Section id="education" icon={FiBriefcase} title="Education" subtitle="Add degrees, certificates, or learning programs">
            <div className="space-y-4">
              {form.education.map((item, index) => (
                <div key={index} className="rounded-xl border border-gray-200 p-4 dark:border-white/10">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-semibold">Education {index + 1}</h3>
                    <button type="button" onClick={() => removeListItem("education", index)} className="text-red-500">
                      <FiTrash2 size={17} />
                    </button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Institution" value={item.institution} onChange={(value) => updateListItem("education", index, "institution", value)} />
                    <Field label="Degree" value={item.degree} onChange={(value) => updateListItem("education", index, "degree", value)} />
                    <Field label="Field" value={item.field} onChange={(value) => updateListItem("education", index, "field", value)} />
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Start" value={item.startDate} onChange={(value) => updateListItem("education", index, "startDate", value)} placeholder="2022" />
                      <Field label="End" value={item.endDate} onChange={(value) => updateListItem("education", index, "endDate", value)} placeholder="Present" />
                    </div>
                    <div className="md:col-span-2">
                      <TextArea label="Description" value={item.description} onChange={(value) => updateListItem("education", index, "description", value)} rows={3} />
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => addListItem("education", { ...emptyEducation })} className="inline-flex items-center gap-2 rounded-lg bg-[#070719] px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                <FiPlus size={16} />
                Add Education
              </button>
            </div>
          </Section>

          <Section id="experience" icon={FiBriefcase} title="Experience" subtitle="Add jobs, internships, freelance work, or roles">
            <div className="space-y-4">
              {form.experience.map((item, index) => (
                <div key={index} className="rounded-xl border border-gray-200 p-4 dark:border-white/10">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-semibold">Experience {index + 1}</h3>
                    <button type="button" onClick={() => removeListItem("experience", index)} className="text-red-500">
                      <FiTrash2 size={17} />
                    </button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Company" value={item.company} onChange={(value) => updateListItem("experience", index, "company", value)} />
                    <Field label="Role" value={item.role} onChange={(value) => updateListItem("experience", index, "role", value)} />
                    <Field label="Start" value={item.startDate} onChange={(value) => updateListItem("experience", index, "startDate", value)} placeholder="Jan 2024" />
                    <Field label="End" value={item.endDate} onChange={(value) => updateListItem("experience", index, "endDate", value)} placeholder="Present" />
                    <div className="md:col-span-2">
                      <TextArea label="Description" value={item.description} onChange={(value) => updateListItem("experience", index, "description", value)} rows={3} />
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => addListItem("experience", { ...emptyExperience })} className="inline-flex items-center gap-2 rounded-lg bg-[#070719] px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                <FiPlus size={16} />
                Add Experience
              </button>
            </div>
          </Section>

          <Section id="skills" icon={FiCode} title="Skills" subtitle="Technologies and tools you work with">
            <TagInput tags={form.skills} onChange={(skills) => setForm((current) => ({ ...current, skills }))} />
          </Section>

          <Section id="projects" icon={FiBriefcase} title="Projects" subtitle="Your best work showcased professionally">
            <div className="space-y-4">
              {form.projects.map((project, index) => (
                <div key={`${project.repoUrl}-${index}`} className="rounded-xl border border-gray-200 p-5 dark:border-white/10">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Project {index + 1}</h3>
                    <button type="button" onClick={() => removeListItem("projects", index)} className="text-red-500">
                      <FiTrash2 size={17} />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <Field label="Name" value={project.name} onChange={(value) => updateListItem("projects", index, "name", value)} />
                    <TextArea label="Description" value={project.description} onChange={(value) => updateListItem("projects", index, "description", value)} rows={3} />
                    <TagInput
                      tags={project.technologies || []}
                      placeholder="Add technology..."
                      onChange={(technologies) => updateListItem("projects", index, "technologies", technologies)}
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Repository URL" value={project.repoUrl} onChange={(value) => updateListItem("projects", index, "repoUrl", value)} />
                      <Field label="Live URL" value={project.liveUrl} onChange={(value) => updateListItem("projects", index, "liveUrl", normalizeUrl(value))} />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addListItem("projects", { name: "", description: "", technologies: [], repoUrl: "", liveUrl: "" })}
                className="inline-flex items-center gap-2 rounded-lg bg-[#070719] px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                <FiPlus size={16} />
                Add Project
              </button>
            </div>
          </Section>

          <Section id="contact" icon={FiMail} title="Contact" subtitle="Where people can reach you">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Email" value={form.contact.email} onChange={(value) => updateContact("email", value)} type="email" />
              <Field label="Phone" value={form.contact.phone} onChange={(value) => updateContact("phone", value)} />
              <Field label="LinkedIn" value={form.contact.linkedin} onChange={(value) => updateContact("linkedin", value)} />
              <Field label="GitHub" value={form.contact.github} onChange={(value) => updateContact("github", value)} />
              <div className="md:col-span-2">
                <Field label="Location" value={form.contact.location} onChange={(value) => updateContact("location", value)} />
              </div>
            </div>
          </Section>

          <div className="flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-[#292929] dark:bg-[#0b0b0b]">
            <div>
              <h2 className="text-lg font-semibold">Ready for the next step?</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Name your portfolio and continue to save it to your dashboard.
              </p>
              {error && (
                <p className="mt-3 text-sm font-medium text-red-600 dark:text-red-300">
                  {error}
                </p>
              )}
              {success && (
                <p className="mt-3 text-sm font-medium text-green-600 dark:text-green-300">
                  {success}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex-1 max-w-md">
                <Field 
                  label="Portfolio Title" 
                  value={portfolioTitle} 
                  onChange={setPortfolioTitle} 
                  placeholder="e.g. My Awesome Portfolio" 
                />
              </div>
              <button
                type="button"
                onClick={handleContinue}
                disabled={saving || loadingDraft}
                className="inline-flex h-[46px] items-center justify-center gap-2 rounded-lg bg-[#070719] px-6 text-sm font-bold text-white transition hover:bg-purple-700 disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                {saving ? "Saving..." : "Continue"}
                <FiExternalLink size={16} />
              </button>
            </div>
          </div>

          {savedJson && (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-[#292929] dark:bg-[#0b0b0b]">
              <h2 className="mb-3 text-lg font-semibold">Next Step JSON</h2>
              <pre className="max-h-96 overflow-auto rounded-lg bg-gray-100 p-4 text-xs leading-5 text-gray-900 dark:bg-black dark:text-gray-100">
                {JSON.stringify(savedJson, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PortfolioBuilderForm;
