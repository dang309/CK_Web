const aliases = (prefix = `src`) => ({
  "@components": `${prefix}/components`,
  "@containers": `${prefix}/containers`,
  "@config": `${prefix}/config`,
  "@pages": `${prefix}/pages`,
  "@icons": `${prefix}/Icons`,
  "@utils": `${prefix}/utils`,
  "@services": `${prefix}/services`,
  src: `${prefix}`,
});

module.exports = aliases;
