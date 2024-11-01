import React, { useEffect, useRef } from 'react';

const ParticleAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mousePosition = { x: 0, y: 0 };
    let hue = 0;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.hue = hue;
        this.timeOffset = Math.random() * Math.PI * 2;
        this.life = 0;
        this.maxLife = Math.random() * 100 + 150;
        this.opacity = 1;
      }

      update(time) {
        // Wave motion
        this.x += this.speedX;
        this.y += this.speedY + Math.sin(time * 0.001 + this.timeOffset) * 0.5;

        // Mouse interaction
        const dx = this.x - mousePosition.x;
        const dy = this.y - mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          const force = (100 - distance) / 100;
          this.x += Math.cos(angle) * force * 2;
          this.y += Math.sin(angle) * force * 2;
        }

        // Boundary checking with smooth wrapping
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Life cycle
        this.life++;
        if (this.life > this.maxLife) {
          this.life = 0;
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }

        // Fade in/out based on life cycle
        if (this.life < 20) {
          this.opacity = this.life / 20;
        } else if (this.life > this.maxLife - 20) {
          this.opacity = (this.maxLife - this.life) / 20;
        } else {
          this.opacity = 1;
        }
      }

      draw(ctx, time) {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );

        const hueOffset = Math.sin(time * 0.001) * 30;
        const baseHue = (this.hue + hueOffset) % 360;
        
        gradient.addColorStop(0, `hsla(${baseHue}, 100%, 65%, ${this.opacity})`);
        gradient.addColorStop(1, `hsla(${baseHue}, 100%, 65%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 4000);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        ));
      }
    };

    const drawConnections = (ctx) => {
      ctx.strokeStyle = `hsla(${hue}, 100%, 65%, 0.1)`;
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = (time) => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update(time);
        particle.draw(ctx, time);
      });

      drawConnections(ctx);
      
      hue = (hue + 0.5) % 360;
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
};

export default ParticleAnimation;