// D3.js Interactive Experience Visualization
const experiences = [
    {
        id: 1,
        company: "Mir Info Systems Ltd",
        logo: "images/mirinfosys_logo.jpeg",
        position: "Senior Software Engineer",
        startYear: 2020,
        endYear: 2025,
        current: true,
        description: "Leading development teams in building enterprise-grade web platforms. Architecting scalable microservices, mentoring junior developers, and driving technical innovation across the organization.",
        skills: ["Laravel", "React", "MySQL", "AWS", "PHP", "Vue.js", "REST API", "JavaScript", "HTML/CSS", "CodeIgniter"],
        color: "#8B7355"
    },
    {
        id: 2,
        company: "zooFamily",
        avatar: "Z",
        position: "Software Engineer",
        startYear: 2018,
        endYear: 2020,
        current: false,
        description: "Developed cutting-edge travel technology solutions. Integrated payment gateways, optimized booking systems, and enhanced user experience for millions of travelers worldwide.",
        skills: ["Vue.js", "REST API", "JavaScript", "HTML/CSS", "MySQL", "Laravel", "AWS", "CodeIgniter", "jQuery", "PHP"],
        color: "#A0826D"
    },
    {
        id: 3,
        company: "Freelance IT Lab",
        avatar: "F",
        position: "Software Engineer",
        startYear: 2016,
        endYear: 2018,
        current: false,
        description: "Delivered custom web solutions for diverse clients. Built e-commerce platforms, CMS systems, and business applications with modern frameworks and best practices.",
        skills: ["CodeIgniter", "jQuery", "PHP", "MySQL", "REST API", "AWS", "Laravel", "React", "JavaScript", "HTML/CSS", "Vue.js"],
        color: "#8B7355"
    },
    {
        id: 4,
        company: "SovWare",
        avatar: "S",
        position: "Full Stack Developer",
        startYear: 2014,
        endYear: 2016,
        current: false,
        description: "Built responsive web interfaces and robust backend systems. Collaborated with cross-functional teams to deliver high-quality software products on time.",
        skills: ["React", "JavaScript", "Laravel", "MySQL", "AWS", "Vue.js", "REST API", "PHP", "jQuery"],
        color: "#A0826D"
    },
    {
        id: 5,
        company: "Freelance IT Lab",
        avatar: "F",
        position: "Junior Software Engineer",
        startYear: 2012,
        endYear: 2014,
        current: false,
        description: "Began my software engineering journey. Learned core programming concepts, web development fundamentals, and built my first production applications.",
        skills: ["HTML/CSS", "PHP", "JavaScript", "jQuery", "MySQL", "REST API", "Laravel", "React", "Vue.js"],
        color: "#6B5D4F"
    },
    {
        id: 6,
        company: "Tech Startup Innovations",
        avatar: "T",
        position: "Junior Full Stack Developer",
        startYear: 2011,
        endYear: 2012,
        current: false,
        description: "Started my tech career at an early-stage startup. Worked on building web applications and learned industry best practices from experienced mentors.",
        skills: ["PHP", "jQuery", "JavaScript", "MySQL", "HTML/CSS", "REST API", "Laravel"],
        color: "#7B68EE"
    }
];

// Create Interactive D3 Visualization
function createVisualization() {
    const container = d3.select("#experience-visualization");
    const containerWidth = Math.min(1100, window.innerWidth - 60);
    const itemHeight = 240; // Height between cards (vertical spacing)
    const cardHeight = 200; // Actual card height
    const margin = { top: 60, right: 60, bottom: 100, left: 60 }; // Increased top and bottom
    const height = experiences.length * itemHeight + margin.top + margin.bottom;

    const svg = container.append("svg")
        .attr("width", containerWidth)
        .attr("height", height)
        .style("display", "block")
        .style("margin", "0 auto");

    // Create timeline scale
    const xScale = d3.scaleLinear()
        .domain([2012, 2025])
        .range([margin.left, containerWidth - margin.right]);

    // Draw main timeline axis
    const axisY = height - margin.bottom + 20;
    svg.append("line")
        .attr("x1", margin.left)
        .attr("x2", containerWidth - margin.right)
        .attr("y1", axisY)
        .attr("y2", axisY)
        .attr("stroke", "#8B7355")
        .attr("stroke-width", 3)
        .attr("stroke-linecap", "round")
        .style("opacity", 0.4);

    // Year markers with continuous vertical lines and comet animation
    const years = d3.range(2012, 2026, 2);
    svg.selectAll(".year-marker")
        .data(years)
        .enter()
        .append("g")
        .attr("class", "year-marker")
        .each(function(d, i) {
            const g = d3.select(this);
            const yearX = xScale(d);
            
            // Tick mark at bottom only
            g.append("line")
                .attr("x1", yearX)
                .attr("x2", yearX)
                .attr("y1", axisY - 8)
                .attr("y2", axisY + 8)
                .attr("stroke", "#8B7355")
                .attr("stroke-width", 2);
            
            // Year text
            g.append("text")
                .attr("x", yearX)
                .attr("y", axisY + 25)
                .attr("text-anchor", "middle")
                .attr("fill", "#475569")
                .attr("font-size", "14px")
                .attr("font-weight", "600")
                .text(d);
            
            // Comet animation - moving up and down on the year mark line
            function createComet() {
                const tickTop = axisY - 8;
                const tickBottom = axisY + 8;
                const tickHeight = tickBottom - tickTop;
                
                // Alternating direction
                const direction = Math.random() > 0.5 ? 'down' : 'up';
                const startY = direction === 'down' ? tickTop : tickBottom;
                const endY = direction === 'down' ? tickBottom : tickTop;
                
                // Main comet head (glowing circle)
                const comet = g.append("circle")
                    .attr("cx", yearX)
                    .attr("cy", startY)
                    .attr("r", 3)
                    .attr("fill", "#8B7355")
                    .attr("opacity", 0);
                
                // Comet glow
                const glow = g.append("circle")
                    .attr("cx", yearX)
                    .attr("cy", startY)
                    .attr("r", 6)
                    .attr("fill", "#A0826D")
                    .attr("opacity", 0);
                
                // Comet trail
                const trail = g.append("line")
                    .attr("x1", yearX)
                    .attr("x2", yearX)
                    .attr("y1", startY)
                    .attr("y2", startY)
                    .attr("stroke", direction === 'down' ? "url(#comet-gradient-down)" : "url(#comet-gradient-up)")
                    .attr("stroke-width", 2)
                    .attr("stroke-linecap", "round")
                    .attr("opacity", 0);
                
                // Animate comet moving
                comet.transition()
                    .duration(100)
                    .attr("opacity", 1)
                    .transition()
                    .duration(800)
                    .ease(d3.easeLinear)
                    .attr("cy", endY)
                    .transition()
                    .duration(100)
                    .attr("opacity", 0)
                    .remove();
                
                glow.transition()
                    .duration(100)
                    .attr("opacity", 0.5)
                    .transition()
                    .duration(800)
                    .ease(d3.easeLinear)
                    .attr("cy", endY)
                    .transition()
                    .duration(100)
                    .attr("opacity", 0)
                    .remove();
                
                trail.transition()
                    .duration(100)
                    .attr("opacity", 0.7)
                    .transition()
                    .duration(800)
                    .ease(d3.easeLinear)
                    .attrTween("y1", function() {
                        return function(t) {
                            const currentY = startY + (tickHeight * t * (direction === 'down' ? 1 : -1));
                            return direction === 'down' 
                                ? Math.max(tickTop, currentY - 8)
                                : Math.min(tickBottom, currentY + 8);
                        };
                    })
                    .attrTween("y2", function() {
                        return function(t) {
                            return startY + (tickHeight * t * (direction === 'down' ? 1 : -1));
                        };
                    })
                    .transition()
                    .duration(100)
                    .attr("opacity", 0)
                    .remove();
                
                // Repeat comet animation with random interval
                setTimeout(createComet, 2000 + Math.random() * 2000);
            }
            
            // Start comet with staggered delay
            setTimeout(() => createComet(), 1000 + i * 400);
        });
    
    // Create gradients for comet trail (down direction)
    const cometGradientDown = svg.append("defs")
        .append("linearGradient")
        .attr("id", "comet-gradient-down")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");
    
    cometGradientDown.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#8B7355")
        .attr("stop-opacity", 0);
    
    cometGradientDown.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#A0826D")
        .attr("stop-opacity", 0.8);
    
    // Create gradients for comet trail (up direction)
    const cometGradientUp = svg.append("defs")
        .append("linearGradient")
        .attr("id", "comet-gradient-up")
        .attr("x1", "0%")
        .attr("y1", "100%")
        .attr("x2", "0%")
        .attr("y2", "0%");
    
    cometGradientUp.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#8B7355")
        .attr("stop-opacity", 0);
    
    cometGradientUp.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#A0826D")
        .attr("stop-opacity", 0.8);

    // Technology-based color palette (define once, use everywhere)
    const techColors = {
        'Laravel': '#FF2D20',
        'React': '#61DAFB',
        'MySQL': '#4479A1',
        'AWS': '#FF9900',
        'PHP': '#777BB4',
        'Vue.js': '#42B883',
        'REST API': '#009688',
        'CodeIgniter': '#EE4623',
        'jQuery': '#0769AD',
        'JavaScript': '#F7DF1E',
        'HTML/CSS': '#E34F26'
    };

    // Create experience items
    experiences.forEach((exp, i) => {
        const yPos = i * itemHeight + margin.top;
        const isEven = i % 2 === 0;
        
        const group = svg.append("g")
            .attr("class", "experience-item")
            .style("opacity", 0);

        // Animated entrance with infinite subtle animation
        group.transition()
            .duration(800)
            .delay(i * 150)
            .style("opacity", 1)
            .on("end", function() {
                // Add infinite subtle floating animation
                function floatAnimation() {
                    d3.select(this)
                        .transition()
                        .duration(3000 + i * 200)
                        .ease(d3.easeSinInOut)
                        .attr("transform", `translate(0, -5)`)
                        .transition()
                        .duration(3000 + i * 200)
                        .ease(d3.easeSinInOut)
                        .attr("transform", `translate(0, 5)`)
                        .on("end", floatAnimation);
                }
                floatAnimation.call(this);
            });

        // Calculate timeline bar position (at bottom)
        const timelineY = height - margin.bottom - 20;
        const barWidth = xScale(exp.endYear) - xScale(exp.startYear);
        
        // Bar background
        group.append("rect")
            .attr("x", xScale(exp.startYear))
            .attr("y", timelineY)
            .attr("width", 0)
            .attr("height", 10)
            .attr("rx", 5)
            .attr("fill", exp.color)
            .attr("opacity", 0.2)
            .transition()
            .duration(1000)
            .delay(i * 150 + 200)
            .attr("width", barWidth);

        // Bar foreground (animated fill) with pulse effect
        const barForeground = group.append("rect")
            .attr("x", xScale(exp.startYear))
            .attr("y", timelineY)
            .attr("width", 0)
            .attr("height", 10)
            .attr("rx", 5)
            .attr("fill", `url(#gradient-${i})`)
            .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.15))")
            .transition()
            .duration(1200)
            .delay(i * 150 + 400)
            .attr("width", barWidth)
            .on("end", function() {
                // Infinite glow pulse animation
                function glowPulse() {
                    d3.select(this)
                        .transition()
                        .duration(2000)
                        .ease(d3.easeSinInOut)
                        .style("filter", "drop-shadow(0 2px 8px rgba(0,0,0,0.25))")
                        .transition()
                        .duration(2000)
                        .ease(d3.easeSinInOut)
                        .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.15))")
                        .on("end", glowPulse);
                }
                glowPulse.call(this);
            });

        // Gradient definition
        const gradient = svg.append("defs")
            .append("linearGradient")
            .attr("id", `gradient-${i}`)
            .attr("x1", "0%")
            .attr("x2", "100%");

        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", exp.color);

        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", d3.rgb(exp.color).brighter(0.5));

        // Current indicator (green dot)
        if (exp.current) {
            const pulse = group.append("circle")
                .attr("cx", xScale(exp.endYear))
                .attr("cy", timelineY + 5)
                .attr("r", 0)
                .attr("fill", "#10b981");

            pulse.transition()
                .duration(500)
                .delay(i * 150 + 1200)
                .attr("r", 6);

            function animate() {
                pulse.transition()
                    .duration(1200)
                    .attr("r", 9)
                    .attr("opacity", 0.3)
                    .transition()
                    .duration(1200)
                    .attr("r", 6)
                    .attr("opacity", 1)
                    .on("end", animate);
            }
            setTimeout(() => animate(), i * 150 + 1700);
        }

        // Content box (compact size)
        const boxWidth = Math.min(380, containerWidth * 0.4);
        const boxHeight = cardHeight; // Use the card height variable
        const boxX = isEven ? margin.left + 20 : containerWidth - margin.right - boxWidth - 20;
        const boxY = yPos;

        // Box shadow for depth
        group.append("rect")
            .attr("x", boxX + 2)
            .attr("y", boxY + 2)
            .attr("width", boxWidth)
            .attr("height", boxHeight)
            .attr("rx", 18)
            .attr("fill", "#000")
            .attr("opacity", 0.04);

        // Box background
        const boxBg = group.append("rect")
            .attr("x", boxX)
            .attr("y", boxY)
            .attr("width", boxWidth)
            .attr("height", boxHeight)
            .attr("rx", 18)
            .attr("fill", exp.current ? "#ffffff" : "#fafafa")
            .attr("stroke", exp.color)
            .attr("stroke-width", exp.current ? 2.5 : 1.5)
            .style("filter", exp.current ? "drop-shadow(0 8px 24px rgba(139,115,85,0.12))" : "drop-shadow(0 4px 12px rgba(0,0,0,0.06))");

        // Add clip path to keep badges inside card
        const clipId = `clip-${exp.id}-${i}`;
        svg.append("defs").append("clipPath")
            .attr("id", clipId)
            .append("rect")
            .attr("x", boxX)
            .attr("y", boxY)
            .attr("width", boxWidth)
            .attr("height", boxHeight)
            .attr("rx", 18);
        
        // Create a container group for clipped content
        const clippedGroup = group.append("g")
            .attr("clip-path", `url(#${clipId})`);

        // Logo/Avatar circle
        const logoX = boxX + 30;
        const logoY = boxY + 32;
        
        // Outer glow
        group.append("circle")
            .attr("cx", logoX)
            .attr("cy", logoY)
            .attr("r", 26)
            .attr("fill", exp.color)
            .attr("opacity", 0.1);

        group.append("circle")
            .attr("cx", logoX)
            .attr("cy", logoY)
            .attr("r", 22)
            .attr("fill", `url(#logo-gradient-${i})`)
            .style("filter", "drop-shadow(0 2px 6px rgba(0,0,0,0.12))");

        const logoGrad = svg.append("defs")
            .append("linearGradient")
            .attr("id", `logo-gradient-${i}`)
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "100%");

        logoGrad.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", exp.color);

        logoGrad.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", d3.rgb(exp.color).darker(0.5));

        if (exp.avatar) {
            group.append("text")
                .attr("x", logoX)
                .attr("y", logoY + 7)
                .attr("text-anchor", "middle")
                .attr("fill", "#fff")
                .attr("font-size", "20px")
                .attr("font-weight", "800")
                .text(exp.avatar);
        }

        // Active badge
        if (exp.current) {
            group.append("rect")
                .attr("x", boxX + boxWidth - 65)
                .attr("y", boxY + 12)
                .attr("width", 55)
                .attr("height", 22)
                .attr("rx", 11)
                .attr("fill", "#10b981")
                .style("filter", "drop-shadow(0 1px 4px rgba(16,185,129,0.3))");

            group.append("text")
                .attr("x", boxX + boxWidth - 37.5)
                .attr("y", boxY + 26)
                .attr("text-anchor", "middle")
                .attr("fill", "#fff")
                .attr("font-size", "10px")
                .attr("font-weight", "700")
                .attr("letter-spacing", "0.5px")
                .text("ACTIVE");
        }

        // Position title
        const textStartX = logoX + 40;
        group.append("text")
            .attr("x", textStartX)
            .attr("y", boxY + 24)
            .attr("fill", "#0f172a")
            .attr("font-size", exp.current ? "15px" : "14px")
            .attr("font-weight", "800")
            .attr("letter-spacing", "-0.2px")
            .text(exp.position);

        // Company name with year breakdown
        group.append("text")
            .attr("x", textStartX)
            .attr("y", boxY + 42)
            .attr("fill", exp.color)
            .attr("font-size", "13px")
            .attr("font-weight", "700")
            .text(exp.company);

        // Year breakdown - consistent right side for all cards
        const rightX = boxX + boxWidth - 12;
        
        group.append("text")
            .attr("x", rightX)
            .attr("y", boxY + 42)
            .attr("text-anchor", "end")
            .attr("fill", "#94a3b8")
            .attr("font-size", "11px")
            .attr("font-weight", "600")
            .text(`${exp.startYear} - ${exp.current ? 'Present' : exp.endYear}`);

        // Duration on second line
        group.append("text")
            .attr("x", rightX)
            .attr("y", boxY + 57)
            .attr("text-anchor", "end")
            .attr("fill", "#cbd5e1")
            .attr("font-size", "10px")
            .attr("font-weight", "500")
            .text(`${exp.endYear - exp.startYear} yrs`);

        // Description (wrapped text) - 1 line only
        const descLines = wrapText(exp.description, 45);
        if (descLines[0]) {
            group.append("text")
                .attr("x", boxX + 18)
                .attr("y", boxY + 82)
                .attr("fill", "#64748b")
                .attr("font-size", "12px")
                .attr("font-weight", "500")
                .attr("letter-spacing", "0.2px")
                .text(descLines[0].substring(0, 48) + (descLines[0].length > 48 ? '...' : ''));
        }

        // Skills badges with tech colors and random swap animation
        const skillsData = exp.skills.map((skill, si) => ({
            skill,
            color: techColors[skill] || exp.color,
            width: skill.length * 7.5 + 20,
            originalIndex: si
        }));
        
        // Track order of skills
        let skillOrder = skillsData.map((_, idx) => idx);
        const skillStartY = boxY + boxHeight - 45; // Start from bottom with more space
        const skillRowEnd = boxX + boxWidth - 12;
        
        // Function to render badges based on current order
        function renderBadges() {
            clippedGroup.selectAll(".badge-container").remove();
            let currentX = boxX + 12;
            let currentY = skillStartY;
            let badgesInRow = 0;
            
            skillOrder.forEach((originalIdx, displayIdx) => {
                const data = skillsData[originalIdx];
                
                // Show all skills (no limit, will wrap naturally)
                
                // Check if we need to wrap to next line
                if (currentX + data.width + 8 > skillRowEnd && badgesInRow > 0) {
                    currentX = boxX + 12;
                    currentY -= 28; // Move up for next row
                    badgesInRow = 0;
                }
                
                // Badge container group
                const badgeContainer = clippedGroup.append("g")
                    .attr("class", "badge-container")
                    .attr("data-skill", data.skill);
                
                // Badge background
                badgeContainer.append("rect")
                    .attr("class", "badge-bg")
                    .attr("x", currentX)
                    .attr("y", currentY)
                    .attr("width", data.width)
                    .attr("height", 22)
                    .attr("rx", 6)
                    .attr("fill", data.color)
                    .attr("opacity", 0.12);

                // Badge border
                badgeContainer.append("rect")
                    .attr("class", "badge-border")
                    .attr("x", currentX)
                    .attr("y", currentY)
                    .attr("width", data.width)
                    .attr("height", 22)
                    .attr("rx", 6)
                    .attr("fill", "none")
                    .attr("stroke", data.color)
                    .attr("stroke-width", 1.5)
                    .attr("opacity", 0.5);

                badgeContainer.append("text")
                    .attr("class", "badge-text")
                    .attr("x", currentX + data.width / 2)
                    .attr("y", currentY + 14)
                    .attr("text-anchor", "middle")
                    .attr("fill", data.color)
                    .attr("font-size", "9.5px")
                    .attr("font-weight", "700")
                    .attr("letter-spacing", "0.2px")
                    .text(data.skill);
                
                // Update position for next badge
                currentX += data.width + 8;
                badgesInRow++;
                
                // Fade in animation
                badgeContainer.style("opacity", 0)
                    .transition()
                    .duration(300)
                    .style("opacity", 1);
            });
        }
        
        // Initial render
        renderBadges();
        
        // Random swap animation
        function swapBadges() {
            // Pick two random positions in display order
            const pos1 = Math.floor(Math.random() * skillOrder.length);
            let pos2 = Math.floor(Math.random() * skillOrder.length);
            while (pos2 === pos1) {
                pos2 = Math.floor(Math.random() * skillOrder.length);
            }
            
            // Fade out
            clippedGroup.selectAll(".badge-container")
                .transition()
                .duration(300)
                .style("opacity", 0)
                .on("end", function() {
                    // Swap in array
                    [skillOrder[pos1], skillOrder[pos2]] = [skillOrder[pos2], skillOrder[pos1]];
                    
                    // Re-render with new order
                    renderBadges();
                });
            
            // Schedule next swap
            setTimeout(swapBadges, 4000 + Math.random() * 3000);
        }
        
        // Start swapping after initial delay
        if (skillsData.length > 1) {
            setTimeout(() => swapBadges(), 4000 + i * 500);
        }

        // Connector line from box to timeline - lotus petal spiral design
        const connectorStartX = isEven ? boxX + boxWidth : boxX;
        const connectorStartY = boxY + boxHeight / 2;
        const connectorEndX = (xScale(exp.startYear) + xScale(exp.endYear)) / 2;
        const connectorEndY = timelineY;
        
        // Create spiral/petal curves
        const midX = (connectorStartX + connectorEndX) / 2;
        const midY = (connectorStartY + connectorEndY) / 2;
        const distance = Math.sqrt(Math.pow(connectorEndX - connectorStartX, 2) + Math.pow(connectorEndY - connectorStartY, 2));
        const spiralStrength = distance * 0.3;
        const direction = isEven ? 1 : -1;
        
        // Create multi-layer spiral paths for petal effect
        const spiralLayers = 3;
        
        for (let layer = 0; layer < spiralLayers; layer++) {
            const layerOffset = (layer - 1) * 15;
            const layerOpacity = 0.15 - (layer * 0.03);
            const layerWidth = 3 + (layer * 1.5);
            
            // Spiral control points
            const cp1X = connectorStartX + spiralStrength * direction * (1 + layer * 0.3);
            const cp1Y = connectorStartY + layerOffset;
            const cp2X = midX + spiralStrength * direction * 1.5 * (layer % 2 === 0 ? 1 : -1);
            const cp2Y = midY - spiralStrength * 0.5 + layerOffset;
            const cp3X = connectorEndX - spiralStrength * direction * (layer * 0.2);
            const cp3Y = connectorEndY + layerOffset;
            
            group.append("path")
                .attr("d", `M ${connectorStartX} ${connectorStartY} 
                           C ${cp1X} ${cp1Y},
                             ${cp2X} ${cp2Y},
                             ${cp3X} ${cp3Y}`)
                .attr("fill", "none")
                .attr("stroke", exp.color)
                .attr("stroke-width", layerWidth)
                .attr("opacity", layerOpacity)
                .attr("stroke-linecap", "round")
                .attr("stroke-linejoin", "round");
        }
        
        // Main central spiral line
        const mainSpiral = group.append("path")
            .attr("d", `M ${connectorStartX} ${connectorStartY}
                       C ${connectorStartX + spiralStrength * direction * 1.2} ${connectorStartY - 10},
                         ${midX + spiralStrength * direction * 2} ${midY - spiralStrength * 0.7},
                         ${connectorEndX - spiralStrength * direction * 0.3} ${connectorEndY}`)
            .attr("fill", "none")
            .attr("stroke", exp.color)
            .attr("stroke-width", 2)
            .attr("opacity", 0.7)
            .attr("stroke-linecap", "round")
            .attr("stroke-linejoin", "round")
            .attr("id", `connector-${exp.id}`);
        
        // Rotating spiral particles
        function createSpiralParticle(delay) {
            const particle = group.append("circle")
                .attr("r", 2)
                .attr("fill", exp.color)
                .attr("opacity", 0.9);
            
            particle.transition()
                .delay(delay)
                .duration(2800)
                .ease(d3.easeQuadInOut)
                .attrTween("cx", function() {
                    return function(t) {
                        const point = mainSpiral.node().getPointAtLength(t * mainSpiral.node().getTotalLength());
                        return point.x;
                    };
                })
                .attrTween("cy", function() {
                    return function(t) {
                        const point = mainSpiral.node().getPointAtLength(t * mainSpiral.node().getTotalLength());
                        return point.y;
                    };
                })
                .attrTween("r", function() {
                    return function(t) {
                        // Breathing effect
                        return 2 + Math.sin(t * Math.PI * 4) * 0.5;
                    };
                })
                .on("end", function() {
                    d3.select(this).remove();
                    if (Math.random() > 0.2) createSpiralParticle(i * 350 + 600);
                });
        }
        
        // Start particles
        for (let p = 0; p < 3; p++) {
            setTimeout(() => createSpiralParticle(i * 350), (i * 350 + 900) + p * 900);
        }

        // Connector endpoint - lotus center
        group.append("circle")
            .attr("cx", connectorEndX)
            .attr("cy", connectorEndY)
            .attr("r", 4)
            .attr("fill", exp.color)
            .attr("opacity", 0.9)
            .style("filter", `drop-shadow(0 0 3px ${exp.color})`);
        
        // Get random color from skills
        function getSkillColor() {
            const skill = exp.skills[Math.floor(Math.random() * exp.skills.length)];
            return techColors[skill] || exp.color;
        }
        
        // Ripple effect on card border when comet hits
        function createBorderRipple(cometColor) {
            // Outer expanding ripples
            const rippleCount = 6;
            
            for (let j = 0; j < rippleCount; j++) {
                // Main ripple - expanding outward
                group.append("rect")
                    .attr("x", boxX)
                    .attr("y", boxY)
                    .attr("width", boxWidth)
                    .attr("height", boxHeight)
                    .attr("rx", 18)
                    .attr("fill", "none")
                    .attr("stroke", cometColor)
                    .attr("stroke-width", 3)
                    .attr("opacity", 0.8)
                    .style("filter", `drop-shadow(0 0 10px ${cometColor})`)
                    .transition()
                    .delay(j * 60)
                    .duration(1500)
                    .ease(d3.easeCubicOut)
                    .attr("stroke-width", 0.3)
                    .attr("opacity", 0)
                    .attr("x", boxX - 30 - j * 5)
                    .attr("y", boxY - 30 - j * 5)
                    .attr("width", boxWidth + 60 + j * 10)
                    .attr("height", boxHeight + 60 + j * 10)
                    .attr("rx", 22 + j * 4)
                    .remove();
            }
            
            // Inner bright border flash
            group.append("rect")
                .attr("x", boxX + 1)
                .attr("y", boxY + 1)
                .attr("width", boxWidth - 2)
                .attr("height", boxHeight - 2)
                .attr("rx", 16)
                .attr("fill", "none")
                .attr("stroke", cometColor)
                .attr("stroke-width", 3)
                .attr("opacity", 1)
                .style("filter", `drop-shadow(0 0 15px ${cometColor})`)
                .transition()
                .duration(300)
                .ease(d3.easeQuadOut)
                .attr("opacity", 0)
                .remove();
            
            // Flash effect on impact - bright initial glow
            group.append("rect")
                .attr("x", boxX)
                .attr("y", boxY)
                .attr("width", boxWidth)
                .attr("height", boxHeight)
                .attr("rx", 18)
                .attr("fill", cometColor)
                .attr("opacity", 0.3)
                .style("filter", `drop-shadow(0 0 15px ${cometColor})`)
                .transition()
                .duration(200)
                .ease(d3.easeQuadOut)
                .attr("opacity", 0)
                .remove();
        }
        
        // Comet animation along connector line - color changes dynamically
        function createConnectorComet() {
            const pathLength = mainSpiral.node().getTotalLength();
            const direction = Math.random() > 0.5 ? 'forward' : 'backward';
            
            // Get random color from this card's skills
            function getCurrentSkillColor() {
                const skill = exp.skills[Math.floor(Math.random() * exp.skills.length)];
                return techColors[skill] || exp.color;
            }
            
            let currentCometColor = getCurrentSkillColor();
            
            // Comet trail (large blurred glow)
            const cometTrail = group.append("circle")
                .attr("r", 14)
                .attr("fill", currentCometColor)
                .attr("opacity", 0)
                .style("filter", `blur(5px)`);
            
            // Comet glow (medium bright)
            const connectorGlow = group.append("circle")
                .attr("r", 8)
                .attr("fill", currentCometColor)
                .attr("opacity", 0)
                .style("filter", `blur(2px)`);
            
            // Comet head (bright visible core)
            const connectorComet = group.append("circle")
                .attr("r", 5)
                .attr("fill", currentCometColor)
                .attr("opacity", 0)
                .style("filter", `drop-shadow(0 0 6px ${currentCometColor})`);
            
            // Set starting position
            const startPoint = direction === 'forward' 
                ? mainSpiral.node().getPointAtLength(0)
                : mainSpiral.node().getPointAtLength(pathLength);
            
            cometTrail.attr("cx", startPoint.x).attr("cy", startPoint.y);
            connectorGlow.attr("cx", startPoint.x).attr("cy", startPoint.y);
            connectorComet.attr("cx", startPoint.x).attr("cy", startPoint.y);
            
            // Animate trail (slowest, largest) - with color change every 25%
            cometTrail.transition()
                .duration(150)
                .attr("opacity", 0.3)
                .transition()
                .duration(1800)
                .ease(d3.easeCubicInOut)
                .attrTween("cx", function() {
                    return function(t) {
                        // Change color every 25% of journey
                        if (Math.floor(t * 4) > Math.floor((t - 0.01) * 4)) {
                            currentCometColor = getCurrentSkillColor();
                            cometTrail.attr("fill", currentCometColor);
                            connectorGlow.attr("fill", currentCometColor);
                            connectorComet.attr("fill", currentCometColor).style("filter", `drop-shadow(0 0 6px ${currentCometColor})`);
                        }
                        const length = direction === 'forward' ? pathLength * t : pathLength * (1 - t);
                        return mainSpiral.node().getPointAtLength(length).x;
                    };
                })
                .attrTween("cy", function() {
                    return function(t) {
                        const length = direction === 'forward' ? pathLength * t : pathLength * (1 - t);
                        return mainSpiral.node().getPointAtLength(length).y;
                    };
                })
                .transition()
                .duration(150)
                .attr("opacity", 0)
                .remove();
            
            // Animate glow (medium speed)
            connectorGlow.transition()
                .duration(120)
                .attr("opacity", 0.6)
                .transition()
                .duration(1600)
                .ease(d3.easeCubicInOut)
                .attrTween("cx", function() {
                    return function(t) {
                        const length = direction === 'forward' ? pathLength * t : pathLength * (1 - t);
                        return mainSpiral.node().getPointAtLength(length).x;
                    };
                })
                .attrTween("cy", function() {
                    return function(t) {
                        const length = direction === 'forward' ? pathLength * t : pathLength * (1 - t);
                        return mainSpiral.node().getPointAtLength(length).y;
                    };
                })
                .transition()
                .duration(120)
                .attr("opacity", 0)
                .remove();
            
            // Animate comet head (fastest, brightest)
            connectorComet.transition()
                .duration(100)
                .attr("opacity", 1)
                .transition()
                .duration(1400)
                .ease(d3.easeCubicInOut)
                .attrTween("cx", function() {
                    return function(t) {
                        const length = direction === 'forward' ? pathLength * t : pathLength * (1 - t);
                        return mainSpiral.node().getPointAtLength(length).x;
                    };
                })
                .attrTween("cy", function() {
                    return function(t) {
                        const length = direction === 'forward' ? pathLength * t : pathLength * (1 - t);
                        return mainSpiral.node().getPointAtLength(length).y;
                    };
                })
                .on("end", function() {
                    // Trigger ripple when comet hits card (both directions)
                    createBorderRipple(currentCometColor);
                    // Schedule next comet immediately for infinity loop
                    createConnectorComet();
                })
                .transition()
                .duration(100)
                .attr("opacity", 0)
                .remove();
        }
        
        // Start connector comet with delay
        setTimeout(() => createConnectorComet(), 2000 + i * 500);
    });
}

// Helper function to wrap text
function wrapText(text, maxLength) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
        if ((currentLine + word).length <= maxLength) {
            currentLine += (currentLine ? ' ' : '') + word;
        } else {
            if (currentLine) lines.push(currentLine);
            currentLine = word;
        }
    });
    if (currentLine) lines.push(currentLine);
    return lines;
}

// Initialize visualization
window.addEventListener('load', () => {
    createVisualization();
});

// Recreate on window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        d3.select("#experience-visualization").html("");
        createVisualization();
    }, 250);
});
