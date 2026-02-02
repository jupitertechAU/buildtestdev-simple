# BuildTest Development Workflow

## Overview
This repository uses a secure, approval-based workflow with Gitea as the primary development server and GitHub as the public deployment mirror. The workflow includes automated security scanning and manual deployment control.

## Architecture
- **Primary Repository:** Gitea (self-hosted, private)
- **Mirror Repository:** GitHub (public, deployment target)
- **Hosting:** GitHub Pages (buildtest.dev)
- **Development Environment:** Ubuntu VM with VS Code
- **Automation:** Gitea Actions with Docker-based security scanning

## Workflow

### Development Process
1. Edit code in VS Code (Jekyll auto-serves on folder open)
2. Commit changes on `dev` branch (auto-pushes to Gitea via git hook)
3. Create Pull Request in Gitea: `dev` → `main`
4. Automated security scans run (TruffleHog + Gitleaks)
5. Review scan results and approve PR if clean
6. Merge to Gitea `main` branch
7. Manually push from Gitea to GitHub when ready for deployment
8. GitHub Pages automatically deploys changes to buildtest.dev

### Branch Strategy
- `dev` - Active development branch (pushes auto-trigger from local commits)
- `main` - Protected production branch (requires PR approval before merge)

## Deployment Flow
```
Local VM → Gitea (dev) → PR + Security Scans → Approval → Merge (main) → Manual Push → GitHub → GitHub Pages
```

## Security Features

### Automated Scanning
- **TruffleHog:** Detects secrets, API keys, and credentials in code
- **Gitleaks:** Scans for hardcoded secrets and sensitive data
- Scans run automatically on every pull request
- Merge blocked if security issues detected

### Manual Deployment Control
- No automatic GitHub mirroring
- Gitea serves as security gate before public release
- Manual push to GitHub only after verification

## Branch Protection
- `main` branch requires pull request review in Gitea
- Minimum 1 approval required before merge
- Direct pushes to `main` are blocked
- Security scans must pass before merge allowed

## Local Development

### Prerequisites
- Jekyll
- Bundler
- Git with Gitea and GitHub remotes configured
- VS Code with auto-serve task configured

### Testing Locally
VS Code automatically starts Jekyll server on folder open for local testing

## Git Remotes
```bash
gitea  - Primary development repository (self-hosted)
origin - GitHub mirror (deployment target)
```

## Automation

### Git Hooks
- Post-commit hook automatically pushes dev branch changes to Gitea
- No automatic GitHub pushes (manual control retained)

### Gitea Actions
- Workflow file: `.gitea/workflows/security-scan.yml`
- Runs on Ubuntu container via Gitea Runner
- Triggered only on pull requests to main branch

### VS Code Integration
- Auto-serve task configured in `tasks.json`
- Jekyll starts automatically on folder open
- Serves locally for testing

## Infrastructure
- **Gitea Server:** Self-hosted on local infrastructure
- **Gitea Runner:** Docker container for CI/CD automation
- **Development VM:** Ubuntu with Jekyll environment
- **DNS:** Cloudflare managing buildtest.dev
- **Deployment:** GitHub Pages with custom domain

## Completed Tasks

### Development
- [x] Configure Gitea Actions for automated testing
- [x] Set up Git hooks for automated Gitea pushes
- [x] Configure VS Code auto-serve on folder open
- [x] Establish branch protection with PR workflow
- [x] Configure dual remote setup (Gitea + GitHub)

### Security
- [x] Implement automated security scanning (TruffleHog + Gitleaks)
- [x] Configure security scans on pull requests
- [x] Set up Gitea as security gate before public mirror
- [x] Establish manual deployment control to prevent auto-leaks

## TODO

### Development
- [ ] Add pre-commit hooks for local validation

### Security
- [ ] Test security scanners with sample API keys, credentials, and secrets
- [ ] Verify TruffleHog detects hardcoded API tokens and keys
- [ ] Verify Gitleaks detects hardcoded passwords and sensitive data
- [ ] Audit historical commits for leaked credentials
- [ ] Document secret rotation procedures
- [ ] Create security incident response plan
- [ ] Regular security scan tool updates
- [ ] Scan full Git history for accidentally committed sensitive data

---
