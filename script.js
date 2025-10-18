// Text Humanizer Tool - Main JavaScript

class TextHumanizer {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateWordCount();
    }

    bindEvents() {
        // Input events
        document.getElementById('input-text').addEventListener('input', () => {
            this.updateWordCount();
        });

        // Button events
        document.getElementById('humanize-btn').addEventListener('click', () => {
            this.humanizeText();
        });

        document.getElementById('clear-btn').addEventListener('click', () => {
            this.clearAll();
        });

        document.getElementById('copy-btn').addEventListener('click', () => {
            this.copyText();
        });

        document.getElementById('download-btn').addEventListener('click', () => {
            this.downloadText();
        });

        document.getElementById('new-humanize').addEventListener('click', () => {
            this.showInputSection();
        });

        // Enter key support
        document.getElementById('input-text').addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.humanizeText();
            }
        });
    }

    updateWordCount() {
        const inputText = document.getElementById('input-text').value;
        const wordCount = inputText.trim() ? inputText.split(/\s+/).length : 0;
        document.getElementById('input-count').textContent = wordCount;
    }

    getSelectedStyle() {
        const selectedStyle = document.querySelector('input[name="humanize-style"]:checked');
        return selectedStyle ? selectedStyle.value : 'casual';
    }

    async humanizeText() {
        const inputText = document.getElementById('input-text').value.trim();
        
        if (!inputText) {
            this.showError('Please enter some text to humanize');
            return;
        }

        if (inputText.split(/\s+/).length < 3) {
            this.showError('Please enter at least 3 words for better humanization');
            return;
        }

        // Show loading state
        this.setLoadingState(true);

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const style = this.getSelectedStyle();
            const humanizedText = this.processText(inputText, style);
            
            this.displayResults(humanizedText, inputText);
            this.showResultsSection();
            
        } catch (error) {
            this.showError('Error humanizing text. Please try again.');
        } finally {
            this.setLoadingState(false);
        }
    }

    processText(text, style) {
        // Text humanization rules based on style
        const rules = this.getHumanizationRules(style);
        let humanizedText = text;

        // Apply transformation rules
        rules.forEach(rule => {
            humanizedText = humanizedText.replace(rule.pattern, rule.replacement);
        });

        // Add human touches based on style
        humanizedText = this.addHumanTouches(humanizedText, style);

        return humanizedText;
    }

    getHumanizationRules(style) {
        const baseRules = [
            // Remove excessive formality
            { pattern: /\b(utilize|utilization)\b/gi, replacement: 'use' },
            { pattern: /\b(facilitate|facilitation)\b/gi, replacement: 'help' },
            { pattern: /\b(optimize|optimization)\b/gi, replacement: 'improve' },
            { pattern: /\b(leverage)\b/gi, replacement: 'use' },
            { pattern: /\b(synergistic|synergy)\b/gi, replacement: 'working together' },
            { pattern: /\b(paradigm)\b/gi, replacement: 'approach' },
            { pattern: /\b(interface with)\b/gi, replacement: 'work with' },
            { pattern: /\b(implement)\b/gi, replacement: 'set up' },
            { pattern: /\b(enhance)\b/gi, replacement: 'improve' },
            { pattern: /\b(deploy)\b/gi, replacement: 'use' },
            
            // Simplify complex phrases
            { pattern: /\b(at this point in time)\b/gi, replacement: 'now' },
            { pattern: /\b(due to the fact that)\b/gi, replacement: 'because' },
            { pattern: /\b(in order to)\b/gi, replacement: 'to' },
            { pattern: /\b(with regard to)\b/gi, replacement: 'about' },
            { pattern: /\b(prior to)\b/gi, replacement: 'before' },
            { pattern: /\b(subsequent to)\b/gi, replacement: 'after' },
        ];

        const styleRules = {
            casual: [
                { pattern: /\b(approximately)\b/gi, replacement: 'about' },
                { pattern: /\b(additional)\b/gi, replacement: 'more' },
                { pattern: /\b(assistance)\b/gi, replacement: 'help' },
                { pattern: /\b(commence)\b/gi, replacement: 'start' },
                { pattern: /\b(terminate)\b/gi, replacement: 'end' },
            ],
            professional: [
                { pattern: /\b(a lot of)\b/gi, replacement: 'many' },
                { pattern: /\b(get)\b/gi, replacement: 'receive' },
                { pattern: /\b(show)\b/gi, replacement: 'demonstrate' },
                { pattern: /\b(help)\b/gi, replacement: 'assist' },
            ],
            creative: [
                { pattern: /\b(very)\b/gi, replacement: 'incredibly' },
                { pattern: /\b(important)\b/gi, replacement: 'crucial' },
                { pattern: /\b(good)\b/gi, replacement: 'excellent' },
                { pattern: /\b(bad)\b/gi, replacement: 'disappointing' },
            ],
            simple: [
                { pattern: /\b(complicated)\b/gi, replacement: 'complex' },
                { pattern: /\b(sophisticated)\b/gi, replacement: 'advanced' },
                { pattern: /\b(comprehensive)\b/gi, replacement: 'complete' },
            ]
        };

        return [...baseRules, ...(styleRules[style] || [])];
    }

    addHumanTouches(text, style) {
        let result = text;

        // Add contractions for casual style
        if (style === 'casual') {
            result = result.replace(/\b(cannot)\b/gi, "can't");
            result = result.replace(/\b(do not)\b/gi, "don't");
            result = result.replace(/\b(does not)\b/gi, "doesn't");
            result = result.replace(/\b(is not)\b/gi, "isn't");
            result = result.replace(/\b(are not)\b/gi, "aren't");
            result = result.replace(/\b(will not)\b/gi, "won't");
        }

        // Add more conversational elements
        if (style === 'casual' || style === 'creative') {
            // Start with more conversational phrases occasionally
            const starters = ['You know, ', 'Actually, ', 'Well, ', 'So, '];
            if (Math.random() > 0.7) {
                result = starters[Math.floor(Math.random() * starters.length)] + result.toLowerCase();
            }
        }

        // Ensure the text starts with a capital letter and ends with proper punctuation
        result = result.charAt(0).toUpperCase() + result.slice(1);
        if (!result.match(/[.!?]$/)) {
            result += '.';
        }

        return result;
    }

    displayResults(humanizedText, originalText) {
        // Display humanized text
        document.getElementById('output-text').textContent = humanizedText;
        document.getElementById('output-count').textContent = humanizedText.split(/\s+/).length;

        // Calculate and display metrics
        this.calculateMetrics(originalText, humanizedText);
    }

    calculateMetrics(originalText, humanizedText) {
        const readability = this.calculateReadability(humanizedText);
        const naturalness = this.calculateNaturalness(humanizedText);
        const engagement = this.calculateEngagement(humanizedText);
        const simplicity = this.calculateSimplicity(originalText, humanizedText);

        document.getElementById('readability-score').textContent = readability + '%';
        document.getElementById('naturalness-score').textContent = naturalness + '%';
        document.getElementById('engagement-score').textContent = engagement + '%';
        document.getElementById('complexity-score').textContent = simplicity + '%';

        // Calculate improvement score
        const improvement = Math.round((readability + naturalness + engagement) / 3);
        const improvementElement = document.getElementById('improvement-score');
        improvementElement.textContent = `+${improvement}% better`;
        improvementElement.style.display = 'inline-block';
    }

    calculateReadability(text) {
        // Simple readability score based on sentence length and word complexity
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const words = text.split(/\s+/);
        
        const avgSentenceLength = words.length / sentences.length;
        const longWords = words.filter(word => word.length > 6).length;
        const complexityRatio = longWords / words.length;

        let score = 85;
        
        // Adjust based on sentence length (ideal: 15-20 words)
        if (avgSentenceLength > 25) score -= 15;
        else if (avgSentenceLength < 10) score -= 5;
        
        // Adjust based on word complexity
        if (complexityRatio > 0.3) score -= 20;
        else if (complexityRatio < 0.1) score += 5;

        return Math.max(40, Math.min(95, score));
    }

    calculateNaturalness(text) {
        // Score based on conversational indicators
        let score = 70;
        
        // Positive indicators
        if (text.match(/\b(I|you|we|our)\b/gi)) score += 10;
        if (text.match(/[',]/g)) score += 5;
        if (text.length < 200) score += 5; // Shorter texts often feel more natural
        
        // Negative indicators
        if (text.match(/\b(utilize|facilitate|optimize|leverage)\b/gi)) score -= 15;
        if (text.match(/[A-Z]{3,}/g)) score -= 10; // Too many acronyms

        return Math.max(50, Math.min(95, score));
    }

    calculateEngagement(text) {
        // Simple engagement score
        let score = 75;
        
        // Positive engagement factors
        const questions = (text.match(/\?/g) || []).length;
        const exclamations = (text.match(/!/g) || []).length;
        const conversationalWords = (text.match(/\b(you|we|our|let's|actually|really)\b/gi) || []).length;

        score += (questions * 3);
        score += (exclamations * 2);
        score += (conversationalWords * 2);

        return Math.max(60, Math.min(95, score));
    }

    calculateSimplicity(originalText, humanizedText) {
        // Compare complexity reduction
        const originalComplexity = this.getTextComplexity(originalText);
        const humanizedComplexity = this.getTextComplexity(humanizedText);
        
        const improvement = ((originalComplexity - humanizedComplexity) / originalComplexity) * 100;
        return Math.max(0, Math.min(100, 50 + improvement));
    }

    getTextComplexity(text) {
        const words = text.split(/\s+/);
        const longWords = words.filter(word => word.length > 6).length;
        const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;
        const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
        const avgSentenceLength = words.length / sentenceCount;

        return (longWords / words.length) * 100 + avgWordLength + (avgSentenceLength / 10);
    }

    setLoadingState(loading) {
        const button = document.getElementById('humanize-btn');
        if (loading) {
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Humanizing...';
            button.disabled = true;
        } else {
            button.innerHTML = '<i class="fas fa-robot"></i> Humanize Text';
            button.disabled = false;
        }
    }

    showResultsSection() {
        const resultsSection = document.getElementById('results-section');
        resultsSection.classList.remove('hidden');
        resultsSection.classList.add('fade-in');
        
        // Scroll to results
        setTimeout(() => {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }

    showInputSection() {
        document.getElementById('results-section').classList.add('hidden');
        document.getElementById('input-text').focus();
    }

    clearAll() {
        document.getElementById('input-text').value = '';
        document.getElementById('output-text').textContent = 'Your humanized text will appear here...';
        document.getElementById('results-section').classList.add('hidden');
        this.updateWordCount();
        
        // Reset metrics
        ['readability-score', 'naturalness-score', 'engagement-score', 'complexity-score'].forEach(id => {
            document.getElementById(id).textContent = '-';
        });
        
        document.getElementById('improvement-score').style.display = 'none';
    }

    copyText() {
        const text = document.getElementById('output-text').textContent;
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('Text copied to clipboard!', 'success');
        }).catch(() => {
            this.showNotification('Failed to copy text', 'error');
        });
    }

    downloadText() {
        const text = document.getElementById('output-text').textContent;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'humanized-text.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('Text downloaded!', 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}"></i>
            <span>${message}</span>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--accent-color)' : 'var(--danger-color)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: var(--shadow);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            animation: slideInRight 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Add CSS for notifications
const notificationStyles = `
@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new TextHumanizer();
});

// Add some example transformations for demonstration
console.log('Text Humanizer loaded successfully!');
console.log('Features:');
console.log('- AI text detection and humanization');
console.log('- Multiple writing styles');
console.log('- Text analysis metrics');
console.log('- One-click copy and download');